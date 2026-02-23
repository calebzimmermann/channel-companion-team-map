import { useState } from "react";

// ===== TEAM DATA =====
const team = [
  {
    name: "Eric Brooker", initials: "EB", role: "CEO",
    wg: { genius: ["G","T"], competency: ["I","E"], frustration: ["D","W"] },
    voices: null, mbti: null, enneagram: null, sf: null,
    mcode: null, pi: null,
    bigFive: null,
    drive: "Action and completion. Wants to rally people and push things across the finish line.",
    approach: ["Be direct — lead with the ask, not the backstory", "Show momentum and progress", "Come with a plan, not just an idea", "Match his energy and pace"],
    avoid: ["Presenting half-formed ideas without next steps", "Over-discussing when a decision is needed", "Slowing things down without clear reason"],
    pitch: "Lead with the action plan. What are we doing, by when, and who owns it?"
  },
  {
    name: "Alex Rollins", initials: "AR", role: "CMO",
    wg: { genius: ["W","I"], competency: ["D","G"], frustration: ["E","T"] },
    voices: ["Pioneer","Creative"], mbti: "ENFP", enneagram: "3w4", sf: null,
    mcode: null, pi: null,
    bigFive: null,
    drive: "Possibility and originality. Sees what could be and creates solutions nobody else imagines.",
    approach: ["Explore ideas together — riff, don't critique too early", "Give room for creative tangents", "Appreciate originality before asking about feasibility", "Ask 'what if?' to spark deeper thinking"],
    avoid: ["Shutting down brainstorming prematurely", "Demanding execution timelines during ideation", "Being overly critical of new concepts"],
    pitch: "Start with the big vision and the possibility. Ask 'what if we could...?'"
  },
  {
    name: "Caleb Zimmermann", initials: "CZ", role: "Chief Experience Officer",
    wg: { genius: ["G","I"], competency: ["D","E"], frustration: ["W","T"] },
    voices: ["Creative","Connector","Nurturer"], mbti: "ENFP", enneagram: "3w2",
    sf: ["Competition","Connectedness","Individualization","Adaptability","Belief"],
    mcode: null, pi: null,
    bigFive: null,
    drive: "Connecting ideas to people and purpose. Invents solutions and rallies alignment around them.",
    approach: ["Collaborate openly — think out loud together", "Connect ideas to people impact and purpose", "Build on his ideas before redirecting", "Acknowledge the relational dynamics at play"],
    avoid: ["Skipping the 'why' and jumping to tasks", "Pushing to action without team alignment", "Being dismissive of relationships or team dynamics"],
    pitch: "Connect the idea to people and purpose. Who does this help and why does it matter?"
  },
  {
    name: "David Zimmermann", initials: "DZ", role: "Business Development Rep",
    wg: { genius: ["I","D"], competency: ["G","W"], frustration: ["E","T"] },
    voices: ["Connector","Creative"], mbti: null, enneagram: null,
    sf: null,
    mcode: ["Excel","Realize The Vision","Maximize","Architect","Finish"],
    pi: null,
    bigFive: null,
    drive: "Creating and evaluating. Invents practical solutions and has strong instincts for what will actually work.",
    approach: ["Give time to process — don't expect instant reactions", "Ask for his honest assessment and trust it", "Respect his experience and depth of thought", "Let him present fully-formed ideas, not fragments"],
    avoid: ["Rushing decisions before he's evaluated the angles", "Dismissing his concerns as overthinking", "Expecting him to just 'go with the flow' on big calls"],
    pitch: "Present the concept, then give him space. Ask 'what do you think — will this actually work?'"
  },
  {
    name: "Owen Brooker", initials: "OB", role: "Business Development Rep",
    wg: null,
    voices: ["Pioneer","Connector"], mbti: "ENTP", enneagram: "7w8",
    sf: null, mcode: null, pi: null,
    bigFive: { E: 98, O: 95, A: 0, C: 1, N: 5 },
    drive: "Exploration and debate. Moves fast, challenges everything, and thrives on intellectual sparring.",
    approach: ["Engage in debate — he thinks by arguing", "Keep up with his pace and energy", "Give autonomy over how he gets things done", "Challenge him with hard problems"],
    avoid: ["Micromanaging his process", "Taking his pushback personally — it's how he processes", "Overloading with detailed step-by-step procedures"],
    pitch: "Throw him the challenge. 'Here's a problem nobody's cracked — what would you do?'"
  },
  {
    name: "Josh Schmidt", initials: "JS", role: "CTO",
    wg: { genius: ["W","D"], competency: ["I","G"], frustration: ["E","T"] },
    voices: ["Pioneer","Creative"], mbti: "INTJ", enneagram: null,
    sf: ["Strategic","Ideation","Command","Learner","Activator"],
    mcode: ["Gain Ownership","Serve","Establish"], pi: "Maverick",
    bigFive: null,
    drive: "Strategic vision and evaluation. Sees problems others miss and knows which solutions are actually sound.",
    approach: ["Lead with logic and strategic rationale", "Present data and evidence", "Respect his need to think before reacting", "Give context on the 'why' behind changes"],
    avoid: ["Rushing past the planning phase", "Leading with emotion over rationale", "Changing direction without clear explanation"],
    pitch: "Start with the strategic case. 'Here's the problem, here's the data, here's what I think — what am I missing?'"
  }
];

// ===== PAIR DYNAMICS =====
const pairs = {
  "EB-AR": {
    score: 4, label: "Strong Pipeline",
    dynamic: "Alex dreams it up, Eric drives it home. Natural idea-to-action flow.",
    strengths: ["Alex's Wonder/Invention feeds directly into Eric's Galvanize/Tenacity","Full creative-to-execution pipeline when aligned","Mutual respect for results and achievement"],
    watchOuts: ["Eric may push to action before ideas are fully formed","Alex may resist the pressure to converge too early"],
    tip: "Give Alex space to explore before asking for deliverables."
  },
  "EB-CZ": {
    score: 3, label: "Dual Drivers",
    dynamic: "Both Galvanizers who rally from different angles — Eric toward action, Caleb toward alignment.",
    strengths: ["Shared ability to energize and mobilize the team","Caleb's Invention pairs with Eric's Tenacity for idea-to-completion","Both achievement-oriented and results-driven"],
    watchOuts: ["May compete for the driver's seat on direction","Different pacing — one pushes speed, the other pushes buy-in","Could frustrate each other if priorities aren't aligned upfront"],
    tip: "Divide ownership clearly — who galvanizes the 'what' vs. the 'how.'"
  },
  "EB-DZ": {
    score: 4, label: "Create & Execute",
    dynamic: "David creates and evaluates, Eric rallies and finishes. Clean handoff.",
    strengths: ["David's Invention/Discernment feeds Eric's Galvanize/Tenacity","David's Connector voice builds relational trust","Low natural friction — complementary energies"],
    watchOuts: ["David needs processing time Eric may not instinctively give","Eric's pace could make David feel rushed on evaluations"],
    tip: "David should bring pre-formed ideas to Eric rather than thinking out loud."
  },
  "EB-OB": {
    score: 3, label: "High Voltage",
    dynamic: "Both high-energy and action-oriented, but with very different wiring.",
    strengths: ["Owen's Pioneer energy matches Eric's galvanizing drive","Both want momentum and forward movement","Owen brings fresh perspectives and challenges assumptions"],
    watchOuts: ["Owen's debate style (ENTP) may feel like resistance","Owen's low structure preference clashes with Eric's finish-line focus","Both can escalate pace without checking direction"],
    tip: "Owen debates to THINK, not to oppose. Frame pushback as idea refinement."
  },
  "EB-JS": {
    score: 5, label: "Vision to Execution",
    dynamic: "Josh identifies the problems worth solving, Eric drives the solutions forward. Strongest pipeline on the team.",
    strengths: ["Josh's Wonder/Discernment + Eric's Galvanize/Tenacity = full pipeline","Both are high-energy doers who respect competence","Josh's strategic lens keeps Eric's action focused"],
    watchOuts: ["May amplify urgency without checking blind spots","Could outpace the rest of the team together"],
    tip: "Build in a 24-hour cool-down before committing to big decisions together."
  },
  "AR-CZ": {
    score: 5, label: "Idea Engine",
    dynamic: "Both Inventors, both ENFPs, both Enneagram 3s. Incredible brainstorm chemistry.",
    strengths: ["Feed each other's creative energy naturally","Shared intuitive language and thinking style","Both see the people and possibility angle simultaneously"],
    watchOuts: ["Can spiral into ideation without landing on action","Both frustrate on Tenacity — who follows through?","May create ideas faster than the team can absorb"],
    tip: "Set a timer on brainstorms. End every session with one concrete next step and an owner."
  },
  "AR-DZ": {
    score: 4, label: "Creative Partners",
    dynamic: "Both Creative voices who speak the same language. David's Discernment sharpens Alex's inventions.",
    strengths: ["David evaluates and refines Alex's ideas practically","Shared creative/innovative wavelength","David as sounding board before presenting to wider team"],
    watchOuts: ["Both may prioritize ideas over execution planning","Could over-refine without shipping"],
    tip: "Use David as Alex's evaluator before presenting ideas to the full team."
  },
  "AR-OB": {
    score: 3, label: "Pioneer Clash",
    dynamic: "Both Pioneer energy with different filters — Alex leads with feeling, Owen with logic.",
    strengths: ["Big-picture alignment on vision and possibility","High-energy, fast-moving collaboration","Different perspectives (F vs T) create richer ideas"],
    watchOuts: ["Owen may challenge Alex's ideas through blunt debate","Alex may internalize Owen's directness as criticism","Both can move fast without grounding ideas"],
    tip: "Frame feedback as 'building on' rather than 'poking holes in.'"
  },
  "AR-JS": {
    score: 4, label: "Wonder Twins",
    dynamic: "Both Wonder geniuses — they see problems and possibilities others miss entirely.",
    strengths: ["Shared ability to spot what's not working and imagine what could","Josh adds strategic Discernment to Alex's inventions","Strong vision alignment"],
    watchOuts: ["Both frustrate on Enablement/Tenacity — ideas may stall","Could get lost in the problem space without converging"],
    tip: "Assign a clear owner and deadline for every idea that gets greenlit."
  },
  "CZ-DZ": {
    score: 5, label: "Trusted Alliance",
    dynamic: "Caleb galvanizes what David creates. Both Connectors who build trust naturally.",
    strengths: ["Caleb rallies alignment around David's ideas and evaluations","Both value relationships and read people well","Deep trust and shared context accelerates decisions"],
    watchOuts: ["May form their own consensus without inviting outside challenge","Could move too fast on shared assumptions"],
    tip: "Proactively share conclusions with the wider team early — invite pushback."
  },
  "CZ-OB": {
    score: 3, label: "Harmony vs. Hustle",
    dynamic: "Caleb builds consensus, Owen charges ahead. Different speeds, different styles.",
    strengths: ["Caleb's Nurturer voice provides Owen with relational grounding","Owen's Pioneer energy pushes Caleb past over-deliberation","Complementary Connector voices build external relationships well"],
    watchOuts: ["Owen's blunt style may feel jarring to Caleb's harmony-seeking nature","Caleb's consensus process may feel slow to Owen"],
    tip: "Caleb: interpret Owen's directness as engagement, not disrespect. Owen: give Caleb the 'why' before the 'what.'"
  },
  "CZ-JS": {
    score: 4, label: "Strategy & Soul",
    dynamic: "Caleb brings the people lens, Josh brings the strategic lens. Complementary worldviews.",
    strengths: ["Josh's Wonder/Discernment + Caleb's Galvanize/Invention = strong creative pair","Shared work history builds trust and shorthand","Josh grounds Caleb's flexibility with strategic structure"],
    watchOuts: ["Caleb's spontaneity (ENFP) may frustrate Josh's need for planned strategy (INTJ)","Different decision-making styles — feeling vs. thinking"],
    tip: "When presenting to Josh, lead with strategic rationale first, then the people angle."
  },
  "DZ-OB": {
    score: 3, label: "Depth vs. Speed",
    dynamic: "David evaluates methodically, Owen acts on instinct. Different approaches to the same goals.",
    strengths: ["David's depth complements Owen's breadth","Different approaches create well-rounded outcomes when combined","Both Connectors — build external relationships well together"],
    watchOuts: ["Owen may move before David has finished evaluating","David may feel Owen doesn't think things through enough","Different working tempos"],
    tip: "Share approaches openly — David teaches thoroughness, Owen teaches pace. Both are valuable."
  },
  "DZ-JS": {
    score: 4, label: "Analytical Duo",
    dynamic: "Both Discernment-wired — evaluate ideas through a similar lens. Josh wonders, David invents.",
    strengths: ["Shared analytical rigor creates solid evaluations","Josh identifies problems, David creates solutions","Both value evidence and quality of thought"],
    watchOuts: ["Both may over-analyze before acting","Could reinforce each other's caution without balancing with action"],
    tip: "Set a decision deadline and stick to it. Analysis has diminishing returns."
  },
  "OB-JS": {
    score: 3, label: "Structured Chaos",
    dynamic: "Both Pioneers who see the future, but Josh maps the path while Owen sprints.",
    strengths: ["Both strong thinkers — great strategic debates","Josh's structure complements Owen's spontaneity","Shared comfort with big, bold ideas"],
    watchOuts: ["Owen's low conscientiousness may frustrate Josh's methodical nature","Josh may see Owen's speed as recklessness","Different needs for planning depth"],
    tip: "Josh gives Owen the destination and the 'why' — let Owen figure out his own route."
  }
};

// ===== WG PIPELINE DATA =====
const wgTypes = [
  { code: "W", name: "Wonder", desc: "Pondering what could be", color: "from-violet-500 to-purple-600" },
  { code: "I", name: "Invention", desc: "Creating original solutions", color: "from-blue-500 to-indigo-600" },
  { code: "D", name: "Discernment", desc: "Evaluating and refining", color: "from-cyan-500 to-teal-600" },
  { code: "G", name: "Galvanizing", desc: "Rallying people to act", color: "from-amber-500 to-orange-600" },
  { code: "E", name: "Enablement", desc: "Supporting and assisting", color: "from-rose-500 to-pink-600" },
  { code: "T", name: "Tenacity", desc: "Pushing to completion", color: "from-red-600 to-red-700" }
];

function getPipelineData() {
  const data = {};
  wgTypes.forEach(t => { data[t.code] = { genius: [], competency: [], frustration: [] }; });
  team.forEach(p => {
    if (!p.wg) return;
    p.wg.genius.forEach(c => data[c].genius.push(p));
    p.wg.competency.forEach(c => data[c].competency.push(p));
    p.wg.frustration.forEach(c => data[c].frustration.push(p));
  });
  return data;
}

// ===== VOICE DISTRIBUTION =====
const voiceTypes = ["Pioneer","Creative","Connector","Nurturer","Guardian"];

function getVoiceData() {
  const data = {};
  voiceTypes.forEach(v => { data[v] = []; });
  team.forEach(p => {
    if (p.voices) p.voices.forEach(v => { if (data[v]) data[v].push(p); });
  });
  return data;
}

// ===== HELPERS =====
function getPairKey(a, b) {
  const key1 = `${a.initials}-${b.initials}`;
  const key2 = `${b.initials}-${a.initials}`;
  return pairs[key1] ? key1 : key2;
}

function scoreColor(s) {
  if (s >= 5) return "bg-emerald-500";
  if (s >= 4) return "bg-emerald-400";
  if (s >= 3) return "bg-amber-400";
  if (s >= 2) return "bg-orange-400";
  return "bg-rose-500";
}

function scoreBorder(s) {
  if (s >= 5) return "border-emerald-500";
  if (s >= 4) return "border-emerald-400";
  if (s >= 3) return "border-amber-400";
  if (s >= 2) return "border-orange-400";
  return "border-rose-500";
}

function scoreLabel(s) {
  if (s >= 5) return "High Synergy";
  if (s >= 4) return "Good Synergy";
  if (s >= 3) return "Moderate — Needs Awareness";
  if (s >= 2) return "Notable Tension";
  return "High Friction";
}

// ===== COMPONENTS =====

function Avatar({ person, size = "md", selected = false }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-14 h-14 text-base" };
  const colors = {
    EB: "bg-slate-700", AR: "bg-indigo-600", CZ: "bg-teal-600",
    DZ: "bg-blue-600", OB: "bg-amber-600", JS: "bg-purple-600"
  };
  return (
    <div className={`${sizes[size]} ${colors[person.initials]} rounded-full flex items-center justify-center text-white font-bold ${selected ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : ""}`}>
      {person.initials}
    </div>
  );
}

function WGBadge({ code, level }) {
  const colors = { genius: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40", competency: "bg-amber-500/20 text-amber-300 border-amber-500/40", frustration: "bg-rose-500/20 text-rose-300 border-rose-500/40" };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[level]}`}>{code}</span>
  );
}

// ===== TAB: OVERVIEW =====
function OverviewTab() {
  const pipeline = getPipelineData();
  const voices = getVoiceData();
  return (
    <div className="space-y-6">
      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map(p => (
          <div key={p.initials} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar person={p} size="lg" />
              <div>
                <div className="text-white font-semibold">{p.name}</div>
                <div className="text-slate-400 text-sm">{p.role}</div>
              </div>
            </div>
            {p.wg ? (
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-20">Genius</span>
                  <div className="flex gap-1">{p.wg.genius.map(c => <WGBadge key={c} code={c} level="genius" />)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-20">Competency</span>
                  <div className="flex gap-1">{p.wg.competency.map(c => <WGBadge key={c} code={c} level="competency" />)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-20">Frustration</span>
                  <div className="flex gap-1">{p.wg.frustration.map(c => <WGBadge key={c} code={c} level="frustration" />)}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic mb-3 py-2">Working Genius: not yet assessed</div>
            )}
            <div className="flex flex-wrap gap-1.5">
              {p.voices && p.voices.map(v => <span key={v} className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-xs">{v}</span>)}
              {p.mbti && <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded text-xs">{p.mbti}</span>}
              {p.enneagram && <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded text-xs">E{p.enneagram}</span>}
              {p.pi && <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded text-xs">PI: {p.pi}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Team Composition at a Glance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <div className="text-emerald-400 font-medium text-sm mb-2">Where We're Loaded</div>
            <div className="text-slate-300 text-sm space-y-1">
              <div><span className="text-emerald-300 font-medium">Invention</span> — 3 geniuses + 2 competencies. No shortage of ideas.</div>
              <div><span className="text-emerald-300 font-medium">Galvanizing</span> — 2 geniuses + 3 competencies. Everyone can rally.</div>
              <div><span className="text-emerald-300 font-medium">Pioneer/Creative voices</span> — Nearly everyone. Vision is abundant.</div>
            </div>
          </div>
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4">
            <div className="text-rose-400 font-medium text-sm mb-2">Where We Have Gaps</div>
            <div className="text-slate-300 text-sm space-y-1">
              <div><span className="text-rose-300 font-medium">Enablement</span> — Zero geniuses. Nobody's wired to support and assist.</div>
              <div><span className="text-rose-300 font-medium">Tenacity</span> — 1 genius (Eric), 4 frustrations. Eric carries the finish line.</div>
              <div><span className="text-rose-300 font-medium">Guardian voice</span> — None. Nobody naturally manages process or risk.</div>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
          <div className="text-amber-400 font-medium text-sm mb-1">What This Means</div>
          <div className="text-slate-300 text-sm">This team generates ideas and momentum at an extraordinary rate. The structural risk is in follow-through: without intentional systems for enablement and tenacity, great ideas die between "greenlit" and "shipped." Eric is currently the primary execution anchor — that's unsustainable at scale. The team needs either process scaffolding or an E/T hire.</div>
        </div>
      </div>
    </div>
  );
}

// ===== TAB: GENIUS PIPELINE =====
function PipelineTab() {
  const data = getPipelineData();
  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">The Working Genius model flows left to right: ideas start in Wonder and end in Tenacity. Color intensity shows team depth at each stage.</p>
      <div className="grid grid-cols-6 gap-2">
        {wgTypes.map(type => {
          const d = data[type.code];
          const total = d.genius.length * 3 + d.competency.length * 2 + d.frustration.length * 0;
          const maxPossible = team.filter(p => p.wg).length * 3;
          const strength = maxPossible > 0 ? total / maxPossible : 0;
          const isGap = d.genius.length === 0;
          const isCritical = isGap && d.frustration.length >= 3;
          return (
            <div key={type.code} className={`rounded-xl p-3 border ${isCritical ? "bg-rose-500/10 border-rose-500/50" : isGap ? "bg-amber-500/10 border-amber-500/40" : "bg-slate-800/50 border-slate-700"}`}>
              <div className={`text-center mb-2`}>
                <div className={`text-2xl font-bold ${isCritical ? "text-rose-400" : isGap ? "text-amber-400" : "text-white"}`}>{type.code}</div>
                <div className="text-xs text-slate-400">{type.name}</div>
              </div>
              {/* Strength bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
                <div className={`h-2 rounded-full ${isCritical ? "bg-rose-500" : isGap ? "bg-amber-500" : "bg-emerald-500"}`} style={{ width: `${Math.max(strength * 100, 5)}%` }} />
              </div>
              {/* People */}
              <div className="space-y-2">
                {d.genius.length > 0 && (
                  <div>
                    <div className="text-[10px] text-emerald-400 font-medium uppercase tracking-wider mb-1">Genius</div>
                    <div className="flex flex-wrap gap-1">
                      {d.genius.map(p => <Avatar key={p.initials} person={p} size="sm" />)}
                    </div>
                  </div>
                )}
                {d.competency.length > 0 && (
                  <div>
                    <div className="text-[10px] text-amber-400 font-medium uppercase tracking-wider mb-1">Comp.</div>
                    <div className="flex flex-wrap gap-1">
                      {d.competency.map(p => <Avatar key={p.initials} person={p} size="sm" />)}
                    </div>
                  </div>
                )}
                {d.frustration.length > 0 && (
                  <div>
                    <div className="text-[10px] text-rose-400 font-medium uppercase tracking-wider mb-1">Frust.</div>
                    <div className="flex flex-wrap gap-1">
                      {d.frustration.map(p => <Avatar key={p.initials} person={p} size="sm" />)}
                    </div>
                  </div>
                )}
                {d.genius.length === 0 && d.competency.length === 0 && d.frustration.length === 0 && (
                  <div className="text-xs text-slate-500 italic">No data</div>
                )}
              </div>
              {isCritical && <div className="mt-2 text-[10px] text-rose-400 font-medium text-center bg-rose-500/20 rounded py-1">CRITICAL GAP</div>}
              {isGap && !isCritical && <div className="mt-2 text-[10px] text-amber-400 font-medium text-center bg-amber-500/20 rounded py-1">GAP</div>}
            </div>
          );
        })}
      </div>

      {/* Flow arrows */}
      <div className="flex items-center justify-center gap-1 text-slate-600 text-xs py-2">
        <span className="text-slate-400">Ideation</span>
        <span>{"→ → →"}</span>
        <span className="text-slate-400">Activation</span>
        <span>{"→ → →"}</span>
        <span className="text-slate-400">Implementation</span>
      </div>

      {/* Five Voices */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-3">Five Voices Distribution</h3>
        <div className="grid grid-cols-5 gap-2">
          {voiceTypes.map(v => {
            const people = getVoiceData()[v];
            const isEmpty = people.length === 0;
            return (
              <div key={v} className={`rounded-lg p-3 text-center border ${isEmpty ? "bg-rose-500/10 border-rose-500/40" : "bg-slate-700/50 border-slate-600"}`}>
                <div className={`font-medium text-sm mb-2 ${isEmpty ? "text-rose-400" : "text-white"}`}>{v}</div>
                <div className="flex flex-wrap justify-center gap-1">
                  {people.map(p => <Avatar key={p.initials} person={p} size="sm" />)}
                  {isEmpty && <div className="text-xs text-rose-400 italic">None</div>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 text-xs text-slate-400">Note: Five Voices data available for 5 of 6 members. Eric's voices are not yet assessed.</div>
      </div>
    </div>
  );
}

// ===== TAB: PAIR DYNAMICS =====
function DynamicsTab() {
  const [selected, setSelected] = useState(null);
  const selectedPair = selected ? pairs[selected] : null;
  const selectedNames = selected ? selected.split("-").map(i => team.find(p => p.initials === i)) : [];

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Click any cell to see the pair dynamic. Green = natural synergy. Amber = needs awareness. Color shows where to invest energy.</p>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-20" />
              {team.map(p => (
                <th key={p.initials} className="p-1 text-center">
                  <Avatar person={p} size="sm" />
                  <div className="text-[10px] text-slate-400 mt-1">{p.name.split(" ")[0]}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((row, ri) => (
              <tr key={row.initials}>
                <td className="p-1">
                  <div className="flex items-center gap-2">
                    <Avatar person={row} size="sm" />
                    <span className="text-xs text-slate-400 hidden md:inline">{row.name.split(" ")[0]}</span>
                  </div>
                </td>
                {team.map((col, ci) => {
                  if (ri === ci) return <td key={col.initials} className="p-1"><div className="w-12 h-12 bg-slate-800 rounded-lg" /></td>;
                  const key = getPairKey(row, col);
                  const pair = pairs[key];
                  if (!pair) return <td key={col.initials} className="p-1"><div className="w-12 h-12 bg-slate-800/30 rounded-lg" /></td>;
                  return (
                    <td key={col.initials} className="p-1">
                      <button
                        onClick={() => setSelected(selected === key ? null : key)}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg transition-all hover:scale-105 ${scoreColor(pair.score)} ${selected === key ? "ring-2 ring-white" : "opacity-80 hover:opacity-100"}`}
                      >
                        {pair.score}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500" /> <span className="text-slate-400">5 = High Synergy</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-400" /> <span className="text-slate-400">4 = Good</span></div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-400" /> <span className="text-slate-400">3 = Needs Awareness</span></div>
      </div>

      {/* Detail Card */}
      {selectedPair && selectedNames.length === 2 && (
        <div className={`bg-slate-800/80 border-2 ${scoreBorder(selectedPair.score)} rounded-xl p-5 transition-all`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar person={selectedNames[0]} />
              <span className="text-slate-500 text-xl">+</span>
              <Avatar person={selectedNames[1]} />
              <div>
                <div className="text-white font-semibold">{selectedNames[0].name.split(" ")[0]} & {selectedNames[1].name.split(" ")[0]}</div>
                <div className="text-slate-400 text-sm">{selectedPair.label}</div>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${selectedPair.score >= 4 ? "bg-emerald-500/20 text-emerald-300" : selectedPair.score >= 3 ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300"}`}>
              {scoreLabel(selectedPair.score)}
            </div>
          </div>
          <p className="text-slate-300 text-sm mb-4">{selectedPair.dynamic}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-emerald-400 text-xs font-medium uppercase tracking-wider mb-2">Strengths</div>
              {selectedPair.strengths.map((s, i) => <div key={i} className="text-slate-300 text-sm mb-1 pl-3 border-l-2 border-emerald-500/30">{s}</div>)}
            </div>
            <div>
              <div className="text-amber-400 text-xs font-medium uppercase tracking-wider mb-2">Watch For</div>
              {selectedPair.watchOuts.map((s, i) => <div key={i} className="text-slate-300 text-sm mb-1 pl-3 border-l-2 border-amber-500/30">{s}</div>)}
            </div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-1">Key Tip</div>
            <div className="text-white text-sm">{selectedPair.tip}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== TAB: COMMUNICATION =====
function CommTab() {
  const [active, setActive] = useState(0);
  const p = team[active];
  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Select a team member to see how to approach, communicate with, and present ideas to them.</p>
      {/* Person selector */}
      <div className="flex flex-wrap gap-2">
        {team.map((person, i) => (
          <button
            key={person.initials}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${active === i ? "bg-slate-700 border-slate-500 text-white" : "bg-slate-800/30 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"}`}
          >
            <Avatar person={person} size="sm" selected={active === i} />
            <span className="text-sm font-medium">{person.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar person={p} size="lg" />
          <div>
            <div className="text-white text-lg font-semibold">{p.name}</div>
            <div className="text-slate-400 text-sm">{p.role}</div>
            <div className="flex flex-wrap gap-1 mt-1">
              {p.wg && <span className="text-xs text-emerald-400">WG: {p.wg.genius.join("/")}</span>}
              {p.mbti && <span className="text-xs text-purple-400 ml-2">{p.mbti}</span>}
              {p.voices && <span className="text-xs text-indigo-400 ml-2">{p.voices.join(", ")}</span>}
              {p.enneagram && <span className="text-xs text-pink-400 ml-2">E{p.enneagram}</span>}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">What Drives Them</div>
          <div className="text-slate-200 text-sm">{p.drive}</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
            <div className="text-emerald-400 text-xs font-medium uppercase tracking-wider mb-2">Do This</div>
            {p.approach.map((a, i) => <div key={i} className="text-slate-300 text-sm mb-1.5 pl-3 border-l-2 border-emerald-500/30">{a}</div>)}
          </div>
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-4">
            <div className="text-rose-400 text-xs font-medium uppercase tracking-wider mb-2">Avoid This</div>
            {p.avoid.map((a, i) => <div key={i} className="text-slate-300 text-sm mb-1.5 pl-3 border-l-2 border-rose-500/30">{a}</div>)}
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
          <div className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-1">When Presenting Ideas to {p.name.split(" ")[0]}</div>
          <div className="text-white text-sm font-medium">{p.pitch}</div>
        </div>

        {/* Additional assessments */}
        {(p.sf || p.mcode || p.bigFive) && (
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-2">Additional Assessment Data</div>
            <div className="flex flex-wrap gap-2">
              {p.sf && p.sf.map(s => <span key={s} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">{s}</span>)}
              {p.mcode && p.mcode.map(m => <span key={m} className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded text-xs">MCODE: {m}</span>)}
              {p.bigFive && (
                <div className="flex gap-1">
                  {Object.entries(p.bigFive).map(([k, v]) => (
                    <span key={k} className={`px-2 py-1 rounded text-xs font-mono ${v > 50 ? "bg-indigo-500/20 text-indigo-300" : "bg-slate-700/50 text-slate-400"}`}>
                      {k}:{v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== TAB: EXERCISE =====
function ExerciseTab() {
  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white font-semibold text-lg mb-1">15-Minute Team Alignment Exercise</h3>
        <p className="text-slate-400 text-sm mb-5">Run this in any team meeting. No prep needed beyond having this map open.</p>

        <div className="space-y-4">
          {[
            { time: "0:00 – 3:00", title: "Personal Check", desc: "Each person looks at their own card in the Communication tab. Raise your hand if you agree with your 'What Drives Them' statement. Quick round — anyone want to adjust theirs?" },
            { time: "3:00 – 7:00", title: "Pipeline Reality Check", desc: "Show the Genius Pipeline tab. Ask: 'Look at Enablement and Tenacity. Who feels this gap in practice? What falls through the cracks?' Let people share real examples — 30 seconds each." },
            { time: "7:00 – 12:00", title: "Pair Spotlight", desc: "Pick 2-3 pairs from the Dynamics matrix (start with the highest and lowest scores). Read the dynamic aloud and ask both people: 'Does this ring true? What would you add?' This is the highest-value part — don't rush it." },
            { time: "12:00 – 15:00", title: "One Commitment", desc: "Each person names ONE thing they'll do differently this week based on what they learned. Write them down. These become accountability items for the next check-in." }
          ].map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="text-xs text-cyan-400 font-mono w-28 shrink-0 pt-1">{step.time}</div>
              <div>
                <div className="text-white font-medium text-sm">{step.title}</div>
                <div className="text-slate-300 text-sm">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-3">Ongoing Use</h3>
        <div className="space-y-3 text-slate-300 text-sm">
          <div className="pl-3 border-l-2 border-indigo-500/40"><span className="text-indigo-300 font-medium">Before a 1:1:</span> Pull up that person's Communication card. Adjust your approach.</div>
          <div className="pl-3 border-l-2 border-indigo-500/40"><span className="text-indigo-300 font-medium">When there's friction:</span> Check the Pair Dynamics card. The watch-outs usually explain what's happening.</div>
          <div className="pl-3 border-l-2 border-indigo-500/40"><span className="text-indigo-300 font-medium">When assigning work:</span> Check the Pipeline. Don't assign E/T work to someone who frustrates on it without support.</div>
          <div className="pl-3 border-l-2 border-indigo-500/40"><span className="text-indigo-300 font-medium">When writing to a teammate:</span> Use the LLM Communication Guide to tailor your message to the recipient.</div>
        </div>
      </div>
    </div>
  );
}

// ===== MAIN APP =====
const tabs = [
  { id: "overview", label: "Team Overview" },
  { id: "pipeline", label: "Genius Pipeline" },
  { id: "dynamics", label: "Pair Dynamics" },
  { id: "comm", label: "Communication" },
  { id: "exercise", label: "Team Exercise" }
];

export default function ChannelCompanionTeamMap() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-bold text-white">The Channel Companion</h1>
          <p className="text-slate-400 text-sm">Team Dynamics Map</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-800/50 border-b border-slate-700 px-6">
        <div className="max-w-6xl mx-auto flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id ? "border-cyan-400 text-cyan-400" : "border-transparent text-slate-400 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "pipeline" && <PipelineTab />}
        {activeTab === "dynamics" && <DynamicsTab />}
        {activeTab === "comm" && <CommTab />}
        {activeTab === "exercise" && <ExerciseTab />}
      </div>

      {/* Footer */}
      <div className="text-center text-slate-600 text-xs py-4">
        Built from Working Genius, Five Voices, MBTI, Enneagram, StrengthsFinder, MCODE, and PI assessments. February 2026.
      </div>
    </div>
  );
}