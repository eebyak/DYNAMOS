interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  PUBLIC_SUPPRESSION_THRESHOLD: string;
}

const DIMENSIONS = [
  "ET","MR","XS","RC","IG","MI","SF","BC","CD","PH","RS","PA","TD","DHL","RD","CC",
  "CL-social","CL-cognitive","CL-sensory","CL-affective","FB-S","FB-I","IC-C","IC-A","RSu","CG"
];
const PATTERNS = new Set([
  "deep_systems_architect","precision_resolver","fast_insight_slow_explanation","divergent_idea_generator",
  "domain_locked_expert","split_integration_thinker","big_picture_synthesizer","executive_load_taxed",
  "flow_diver","meaning_gated_performer","burst_creator","routine_anchor","deadline_unlocked_starter",
  "long_horizon_planner","transition_fragile","start_stop_oscillator","precision_literalist","social_cue_load",
  "low_feedback_autonomy","impulsive_enthusiastic_communicator","masked_high_cost_performer",
  "ethical_precision_speaker","affective_floodgate","social_rejection_amplifier","ethical_amplifier",
  "verification_loop","affective_decoupler","open_plan_vulnerable","sensory_seeking_stabilizer",
  "quiet_need_deep_worker","stim_regulation_loop","time_blind_sprinter"
]);
const RECOGNITION = new Set(["strongly_recognize","mostly_recognize","partly_recognize","do_not_recognize","do_not_understand"]);
const FOLLOWUP = new Set(["strongly_agree","mostly_agree","partly_agree","disagree","unsure"]);
const STATUS = new Set(["strong","candidate","context_sensitive"]);
const MISSING = new Set(["yes","no","unsure"]);
const MAX_BODY = 32768;

function isObj(v: unknown): v is Record<string, any> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function exact(obj: Record<string, any>, keys: string[]) {
  const s = new Set(keys);
  return Object.keys(obj).every(k => s.has(k)) && keys.every(k => k in obj);
}
function j(body: unknown, status = 200, headers: HeadersInit = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}
  });
}
function cors(request: Request, env: Env) {
  const origin = request.headers.get("origin");
  if (!origin) return {ok:true, headers:{}};
  const allowed = env.ALLOWED_ORIGINS.split(",").map(s=>s.trim()).filter(Boolean);
  if (!allowed.includes(origin)) return {ok:false, headers:{}};
  return {ok:true, headers:{
    "access-control-allow-origin": origin,
    "access-control-allow-methods":"GET,POST,OPTIONS",
    "access-control-allow-headers":"content-type",
    "access-control-max-age":"86400",
    "vary":"Origin"
  }};
}
function validate(b: any): string[] {
  const e: string[] = [];
  if (!isObj(b)) return ["body must be an object"];
  const top = ["schema","schema_version","submission_id","withdrawal_token_hash","model_version","questionnaire_version","derivation_version","consent_version","scope","scores","presented_precepta","participant_feedback","consent"];
  if (!exact(b, top)) e.push("top-level fields do not match schema");
  if (b.schema !== "dynamos-research-contribution" || b.schema_version !== "1.0.0") e.push("wrong schema");
  if (typeof b.submission_id !== "string" || !/^[0-9a-f-]{36}$/i.test(b.submission_id)) e.push("bad submission_id");
  if (typeof b.withdrawal_token_hash !== "string" || !/^[a-f0-9]{64}$/.test(b.withdrawal_token_hash)) e.push("bad withdrawal hash");
  if (!Array.isArray(b.scope) || b.scope.length !== 1 || b.scope[0] !== "cognitive_learning") e.push("pilot scope must be cognitive_learning");

  if (!isObj(b.scores) || Object.keys(b.scores).length !== DIMENSIONS.length) e.push("scores must contain exactly 26 dimensions");
  else for (const d of DIMENSIONS) if (!Number.isInteger(b.scores[d]) || b.scores[d] < 1 || b.scores[d] > 10) e.push(`bad score ${d}`);

  const shown = new Set<string>();
  if (!Array.isArray(b.presented_precepta)) e.push("presented_precepta must be array");
  else for (const p of b.presented_precepta) {
    if (!isObj(p) || !exact(p,["pattern_id","presentation_status","rank"])) {e.push("bad presented row"); continue;}
    if (!PATTERNS.has(p.pattern_id)) e.push("bad pattern id"); else shown.add(p.pattern_id);
    if (!STATUS.has(p.presentation_status)) e.push("bad presentation status");
  }

  const pf = b.participant_feedback;
  if (!isObj(pf) || !exact(pf,["overall_fit","pattern_recognition","missing_pattern_feedback"])) e.push("bad participant_feedback");
  else {
    if (pf.overall_fit !== null && !RECOGNITION.has(pf.overall_fit)) e.push("bad overall fit");
    if (!Array.isArray(pf.pattern_recognition)) e.push("bad pattern recognition");
    else for (const r of pf.pattern_recognition) {
      if (!isObj(r) || !exact(r,["pattern_id","response"])) {e.push("bad recognition row"); continue;}
      if (!PATTERNS.has(r.pattern_id) || !shown.has(r.pattern_id) || !RECOGNITION.has(r.response)) e.push("bad recognition value");
    }
    const mf = pf.missing_pattern_feedback;
    if (!isObj(mf) || !exact(mf,["important_part_missing","selected_patterns","followups"])) e.push("bad missing feedback");
    else {
      if (mf.important_part_missing !== null && !MISSING.has(mf.important_part_missing)) e.push("bad missing gate");
      if (!Array.isArray(mf.selected_patterns) || mf.selected_patterns.length > 3) e.push("bad missing patterns");
      else for (const id of mf.selected_patterns) if (!PATTERNS.has(id) || shown.has(id)) e.push("bad missing pattern id");
      if (!Array.isArray(mf.followups) || mf.followups.length > 3) e.push("bad followups");
      else for (const f of mf.followups) {
        if (!isObj(f) || !exact(f,["pattern_id","question_id","response"]) || !PATTERNS.has(f.pattern_id) || !FOLLOWUP.has(f.response)) e.push("bad followup");
      }
    }
  }

  const c = b.consent;
  if (!isObj(c)) e.push("bad consent");
  else for (const v of Object.values(c)) if (v !== true) e.push("all consent flags must be true");
  return [...new Set(e)];
}
async function sha256Hex(value: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function saveContribution(b:any, env:Env) {
  const existing = await env.DB.prepare("SELECT submission_id FROM contributions WHERE submission_id=?").bind(b.submission_id).first();
  if (existing) return true;

  const mf = b.participant_feedback.missing_pattern_feedback;
  const stmts:D1PreparedStatement[] = [
    env.DB.prepare(`INSERT INTO contributions
      (submission_id,withdrawal_token_hash,model_version,questionnaire_version,derivation_version,consent_version,scope_json,scores_json,overall_fit,missing_gate,received_month)
      VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(b.submission_id,b.withdrawal_token_hash,b.model_version,b.questionnaire_version,b.derivation_version,b.consent_version,
        JSON.stringify(b.scope),JSON.stringify(b.scores),b.participant_feedback.overall_fit,mf.important_part_missing,new Date().toISOString().slice(0,7))
  ];

  for (const p of b.presented_precepta)
    stmts.push(env.DB.prepare("INSERT INTO presented_precepta VALUES (?,?,?,?)").bind(b.submission_id,p.pattern_id,p.presentation_status,p.rank));
  for (const r of b.participant_feedback.pattern_recognition)
    stmts.push(env.DB.prepare("INSERT INTO pattern_feedback VALUES (?,?,?)").bind(b.submission_id,r.pattern_id,r.response));
  for (const id of mf.selected_patterns)
    stmts.push(env.DB.prepare("INSERT INTO missing_patterns VALUES (?,?)").bind(b.submission_id,id));
  for (const f of mf.followups)
    stmts.push(env.DB.prepare("INSERT INTO followups VALUES (?,?,?,?)").bind(b.submission_id,f.pattern_id,f.question_id,f.response));

  await env.DB.batch(stmts);
  return false;
}

async function stats(req:Request, env:Env, headers:HeadersInit) {
  const u = new URL(req.url);
  const mv=u.searchParams.get("model_version"), qv=u.searchParams.get("questionnaire_version"), dv=u.searchParams.get("derivation_version");
  if (!mv || !qv || !dv) return j({error:"version query parameters required"},400,headers);

  const total = await env.DB.prepare("SELECT COUNT(*) n FROM contributions WHERE model_version=? AND questionnaire_version=? AND derivation_version=?").bind(mv,qv,dv).first<any>();
  const overall = await env.DB.prepare("SELECT COALESCE(overall_fit,'not_answered') response,COUNT(*) n FROM contributions WHERE model_version=? AND questionnaire_version=? AND derivation_version=? GROUP BY COALESCE(overall_fit,'not_answered')").bind(mv,qv,dv).all<any>();
  const judgments = await env.DB.prepare("SELECT COUNT(*) n FROM pattern_feedback pf JOIN contributions c USING(submission_id) WHERE c.model_version=? AND c.questionnaire_version=? AND c.derivation_version=?").bind(mv,qv,dv).first<any>();
  const presented = await env.DB.prepare("SELECT pp.pattern_id,COUNT(*) n FROM presented_precepta pp JOIN contributions c USING(submission_id) WHERE c.model_version=? AND c.questionnaire_version=? AND c.derivation_version=? GROUP BY pp.pattern_id").bind(mv,qv,dv).all<any>();
  const feedback = await env.DB.prepare("SELECT pf.pattern_id,pf.response,COUNT(*) n FROM pattern_feedback pf JOIN contributions c USING(submission_id) WHERE c.model_version=? AND c.questionnaire_version=? AND c.derivation_version=? GROUP BY pf.pattern_id,pf.response").bind(mv,qv,dv).all<any>();
  const missing = await env.DB.prepare("SELECT mp.pattern_id,COUNT(*) n FROM missing_patterns mp JOIN contributions c USING(submission_id) WHERE c.model_version=? AND c.questionnaire_version=? AND c.derivation_version=? GROUP BY mp.pattern_id").bind(mv,qv,dv).all<any>();

  const labels=["strongly_recognize","mostly_recognize","partly_recognize","do_not_recognize","do_not_understand","not_answered"];
  const oc:any=Object.fromEntries(labels.map(x=>[x,0]));
  for (const r of overall.results ?? []) oc[r.response]=Number(r.n);

  const pm=new Map<string,number>(), mm=new Map<string,number>(), fm=new Map<string,any>();
  for (const r of presented.results ?? []) pm.set(r.pattern_id,Number(r.n));
  for (const r of missing.results ?? []) mm.set(r.pattern_id,Number(r.n));
  for (const r of feedback.results ?? []) {
    if (!fm.has(r.pattern_id)) fm.set(r.pattern_id,Object.fromEntries(labels.map(x=>[x,0])));
    fm.get(r.pattern_id)[r.response]=Number(r.n);
  }

  const threshold=Math.max(5,Number(env.PUBLIC_SUPPRESSION_THRESHOLD||20));
  const ids=new Set([...pm.keys(),...mm.keys()]);
  const pattern_stats=[...ids].sort().map(id=>{
    const n=pm.get(id)??0, counts=fm.get(id)??Object.fromEntries(labels.map(x=>[x,0]));
    const answered=labels.slice(0,5).reduce((s,x)=>s+(counts[x]??0),0);
    counts.not_answered=Math.max(0,n-answered);
    const published=n>=threshold;
    return {pattern_id:id,n_presented:published?n:0,recognition_counts:published?counts:Object.fromEntries(labels.map(x=>[x,0])),n_reported_missing:published?(mm.get(id)??0):0,published};
  });

  return j({
    schema:"dynamos-public-stats",schema_version:"1.0.0",generated_at:new Date().toISOString(),
    suppression_threshold:threshold,
    version_cohort:{model_version:mv,questionnaire_version:qv,derivation_version:dv},
    total_contributions:Number(total?.n??0),total_pattern_judgments:Number(judgments?.n??0),
    overall_fit_counts:oc,pattern_stats
  },200,{...headers,"cache-control":"public, max-age=300"});
}

export default {
  async fetch(request:Request, env:Env):Promise<Response> {
    const c=cors(request,env);
    if (!c.ok) return j({error:"origin not allowed"},403);
    if (request.method==="OPTIONS") return new Response(null,{status:204,headers:c.headers});
    const u=new URL(request.url);

    try {
      if (request.method==="GET" && u.pathname==="/v1/health") return j({ok:true,service:"dynamos-research",version:"0.1.0"},200,c.headers);
      if (request.method==="GET" && u.pathname==="/v1/stats") return stats(request,env,c.headers);

      if (request.method==="POST" && u.pathname==="/v1/contributions") {
        const declared=Number(request.headers.get("content-length")||0);
        if (declared>MAX_BODY) return j({error:"payload too large"},413,c.headers);
        const raw=await request.text();
        if (new TextEncoder().encode(raw).byteLength>MAX_BODY) return j({error:"payload too large"},413,c.headers);
        let b:any; try {b=JSON.parse(raw)} catch {return j({error:"invalid JSON"},400,c.headers)}
        const errors=validate(b);
        if (errors.length) return j({error:"invalid contribution",details:errors},400,c.headers);
        const duplicate=await saveContribution(b,env);
        return j({accepted:true,duplicate,submission_id:b.submission_id,receipt_version:"1.0.0"},duplicate?200:201,c.headers);
      }

      if (request.method==="POST" && u.pathname==="/v1/withdraw") {
        let b:any; try {b=await request.json()} catch {return j({error:"invalid JSON"},400,c.headers)}
        if (typeof b?.withdrawal_token!=="string" || !/^[a-f0-9]{64}$/.test(b.withdrawal_token)) return j({error:"invalid withdrawal token"},400,c.headers);
        const hash=await sha256Hex(b.withdrawal_token);
        const row=await env.DB.prepare("SELECT submission_id FROM contributions WHERE withdrawal_token_hash=?").bind(hash).first<any>();
        if (!row) return j({deleted:false},200,c.headers);
        await env.DB.prepare("DELETE FROM contributions WHERE submission_id=?").bind(row.submission_id).run();
        return j({deleted:true},200,c.headers);
      }

      return j({error:"not found"},404,c.headers);
    } catch {
      return j({error:"internal error"},500,c.headers);
    }
  }
};
