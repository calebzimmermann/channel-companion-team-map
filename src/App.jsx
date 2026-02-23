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

// ===== TAB: DEEP DIVE =====
function DeepDiveTab() {
  const [active, setActive] = useState(0);
  const p = team[active];
  const pipeline = getPipelineData();

  // Build unified assessment summary
  function getAssessmentSummary(person) {
    const sections = [];
    if (person.wg) {
      sections.push({ label: "Working Genius", items: [
        { k: "Genius", v: person.wg.genius.join(" + "), color: "text-emerald-400" },
        { k: "Competency", v: person.wg.competency.join(" + "), color: "text-amber-400" },
        { k: "Frustration", v: person.wg.frustration.join(" + "), color: "text-rose-400" }
      ]});
    }
    if (person.voices) sections.push({ label: "Five Voices", items: [{ k: "Voices", v: person.voices.join(", "), color: "text-indigo-400" }] });
    if (person.mbti) sections.push({ label: "MBTI", items: [{ k: "Type", v: person.mbti, color: "text-purple-400" }] });
    if (person.enneagram) sections.push({ label: "Enneagram", items: [{ k: "Type", v: person.enneagram, color: "text-pink-400" }] });
    if (person.sf) sections.push({ label: "StrengthsFinder", items: person.sf.map(s => ({ k: "", v: s, color: "text-sky-400" })) });
    if (person.mcode) sections.push({ label: "MCODE", items: person.mcode.map(m => ({ k: "", v: m, color: "text-teal-400" })) });
    if (person.pi) sections.push({ label: "Predictive Index", items: [{ k: "Profile", v: person.pi, color: "text-cyan-400" }] });
    if (person.bigFive) sections.push({ label: "Big Five", items: Object.entries(person.bigFive).map(([k, v]) => ({ k, v: `${v}th percentile`, color: v > 50 ? "text-indigo-400" : "text-slate-400" })) });
    return sections;
  }

  // Get all pairs involving this person
  function getPersonPairs(person) {
    return team.filter(t => t.initials !== person.initials).map(other => {
      const key = getPairKey(person, other);
      const pair = pairs[key];
      return pair ? { other, pair, key } : null;
    }).filter(Boolean).sort((a, b) => b.pair.score - a.pair.score);
  }

  // Synthesize a unified personality narrative
  function getPersonalitySynthesis(person) {
    const traits = [];
    if (person.wg) {
      const geniusCodes = person.wg.genius;
      if (geniusCodes.includes("W")) traits.push("a deep thinker who naturally ponders what's missing or broken");
      if (geniusCodes.includes("I")) traits.push("a natural creator who generates original solutions");
      if (geniusCodes.includes("D")) traits.push("an evaluator with strong instincts for what will work");
      if (geniusCodes.includes("G")) traits.push("a rallier who energizes people around a direction");
      if (geniusCodes.includes("E")) traits.push("a supporter who helps others succeed");
      if (geniusCodes.includes("T")) traits.push("a finisher who pushes things across the line");
    }
    if (person.mbti) {
      if (person.mbti.startsWith("E")) traits.push("energized by interaction and thinking out loud");
      else traits.push("energized by reflection and thinking before speaking");
      if (person.mbti.includes("NF")) traits.push("values people and possibilities");
      if (person.mbti.includes("NT")) traits.push("values logic and strategy");
    }
    if (person.bigFive) {
      if (person.bigFive.A < 20) traits.push("very direct and unfiltered — pushback is engagement, not opposition");
      if (person.bigFive.C < 20) traits.push("highly spontaneous — prefers autonomy over structure");
      if (person.bigFive.E > 80) traits.push("extremely extraverted and high-energy");
    }
    if (person.enneagram) {
      if (person.enneagram.startsWith("3")) traits.push("achievement-driven and image-conscious");
      if (person.enneagram.startsWith("7")) traits.push("drawn to variety, novelty, and excitement");
    }
    return traits;
  }

  const assessments = getAssessmentSummary(p);
  const personPairs = getPersonPairs(p);
  const synthesis = getPersonalitySynthesis(p);

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Everything we know about each person, synthesized across all assessments into one unified profile.</p>
      {/* Person selector */}
      <div className="flex flex-wrap gap-2">
        {team.map((person, i) => (
          <button key={person.initials} onClick={() => setActive(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${active === i ? "bg-slate-700 border-slate-500 text-white" : "bg-slate-800/30 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"}`}>
            <Avatar person={person} size="sm" selected={active === i} />
            <span className="text-sm font-medium">{person.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Unified Profile */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-5">
          <Avatar person={p} size="lg" />
          <div>
            <div className="text-white text-xl font-bold">{p.name}</div>
            <div className="text-slate-400">{p.role}</div>
          </div>
        </div>

        {/* Personality Synthesis */}
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-4 mb-5">
          <div className="text-indigo-300 text-xs font-medium uppercase tracking-wider mb-2">Unified Personality Synthesis</div>
          <div className="text-slate-200 text-sm leading-relaxed">
            {p.name.split(" ")[0]} is {synthesis.slice(0, 3).join(", ")}
            {synthesis.length > 3 && `. Additionally: ${synthesis.slice(3).join(", ")}`}.
          </div>
        </div>

        {/* Core Drive */}
        <div className="mb-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Core Drive</div>
          <div className="text-white text-sm font-medium">{p.drive}</div>
        </div>

        {/* All Assessments Grid */}
        <div className="mb-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">All Assessment Data</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {assessments.map((section, i) => (
              <div key={i} className="bg-slate-700/30 border border-slate-700 rounded-lg p-3">
                <div className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mb-2">{section.label}</div>
                {section.items.map((item, j) => (
                  <div key={j} className={`text-sm ${item.color}`}>
                    {item.k ? <span className="text-slate-500 text-xs mr-1">{item.k}:</span> : null}
                    {item.v}
                  </div>
                ))}
              </div>
            ))}
            {assessments.length === 0 && <div className="text-slate-500 text-sm italic col-span-4">Limited assessment data available</div>}
          </div>
        </div>

        {/* Communication Cheat Sheet */}
        <div className="mb-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Communication Cheat Sheet</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
              <div className="text-emerald-400 text-xs font-medium mb-2">Do</div>
              {p.approach.map((a, i) => <div key={i} className="text-slate-300 text-xs mb-1">{a}</div>)}
            </div>
            <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg p-3">
              <div className="text-rose-400 text-xs font-medium mb-2">Don't</div>
              {p.avoid.map((a, i) => <div key={i} className="text-slate-300 text-xs mb-1">{a}</div>)}
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-3">
              <div className="text-cyan-400 text-xs font-medium mb-2">Pitch Template</div>
              <div className="text-white text-xs font-medium">{p.pitch}</div>
            </div>
          </div>
        </div>

        {/* Relationship Map */}
        <div>
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">{p.name.split(" ")[0]}'s Relationships (ranked by synergy)</div>
          <div className="space-y-2">
            {personPairs.map(({ other, pair }) => (
              <div key={other.initials} className={`flex items-center gap-3 p-3 rounded-lg border ${scoreBorder(pair.score)} bg-slate-800/30`}>
                <Avatar person={other} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium">{other.name}</span>
                    <span className="text-slate-500 text-xs">— {pair.label}</span>
                  </div>
                  <div className="text-slate-400 text-xs truncate">{pair.dynamic}</div>
                </div>
                <div className={`px-2 py-0.5 rounded text-xs font-bold text-white ${scoreColor(pair.score)}`}>{pair.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== TAB: TEAM RISK DASHBOARD =====
function RiskTab() {
  const pipeline = getPipelineData();
  const voices = getVoiceData();

  const risks = [
    {
      severity: "critical",
      title: "Enablement Vacuum",
      metric: "0 geniuses, 2 competencies, 3 frustrations",
      description: "Nobody on this team is naturally wired to support, assist, and help others succeed. In practice, this means people get stuck without help, onboarding is rough, and handoffs drop.",
      impact: "Tasks stall between stages. New processes lack support structure. People burn out carrying their own load with no backup.",
      mitigation: "Build enablement into process: assign explicit 'support' roles per project. Consider an E/T hire. In the interim, Caleb (E competency) and Eric (E competency) should consciously lean into this."
    },
    {
      severity: "critical",
      title: "Tenacity Bottleneck",
      metric: "1 genius (Eric), 0 competencies, 4 frustrations",
      description: "Eric is the ONLY person wired to push things to completion. Four of five assessed members actively frustrate on Tenacity. Ideas get started but not finished.",
      impact: "Eric becomes the bottleneck for every initiative that needs to ship. If Eric is unavailable, nothing crosses the finish line. Burnout risk is high.",
      mitigation: "Create finish-line rituals: weekly 'ship list' reviews, definition-of-done checklists, and external accountability. Don't assign T-heavy work to T-frustration people without pairing them with Eric or building in deadlines with teeth."
    },
    {
      severity: "high",
      title: "No Guardian Voice",
      metric: "0 of 5 assessed members have Guardian as a voice",
      description: "Guardians manage risk, protect process, and ask 'what could go wrong?' This team has zero. Everyone is biased toward action and possibility.",
      impact: "Blind spots in risk assessment. Processes get built fast but break easily. Nobody naturally advocates for stability or standards.",
      mitigation: "Assign a rotating 'devil's advocate' role in key decisions. Before launching anything, explicitly ask: 'What could go wrong? What are we not seeing?' Consider adding a Guardian-voiced advisor or board member."
    },
    {
      severity: "high",
      title: "Idea Overproduction",
      metric: "3 Invention geniuses, 5 Pioneer/Creative voices",
      description: "This team generates ideas at an extraordinary rate. With 3 Invention geniuses and nearly everyone carrying Pioneer or Creative voices, the bottleneck is never 'what should we do' — it's 'what should we STOP doing.'",
      impact: "Priority whiplash. New ideas constantly compete with in-flight work. Team energy disperses across too many fronts.",
      mitigation: "Implement a hard cap on active initiatives (e.g., 3 rocks per quarter). Use Josh and David's Discernment to ruthlessly filter ideas before they enter the pipeline. Create an 'idea parking lot' so ideas feel captured but don't consume bandwidth."
    },
    {
      severity: "moderate",
      title: "Speed vs. Depth Tension",
      metric: "High E/ENTP/7w8 energy vs. INTJ/Discernment evaluators",
      description: "Some team members (Eric, Owen) want to move fast and break things. Others (Josh, David) need time to evaluate and plan. This is a healthy tension IF managed — destructive if not.",
      impact: "Frustration in meetings. Fast movers feel held back, deep thinkers feel steamrolled. Decisions get made twice — once quickly, once correctly.",
      mitigation: "Create two modes: 'explore' meetings (fast, generative, no commitments) and 'decide' meetings (evaluative, commitment-ready). Label which mode you're in. Give Josh and David pre-read time before decision meetings."
    },
    {
      severity: "moderate",
      title: "All-Extrovert Amplification",
      metric: "5 of 6 members are extraverted (Josh is the lone introvert-leaning)",
      description: "Highly extraverted teams can mistake volume for consensus. The loudest idea wins, not the best one. Josh's quieter processing style may get drowned out.",
      impact: "Josh's strategic insights may be undervalued. Group decisions may reflect the last person who spoke rather than the best analysis. Meetings can become performative rather than productive.",
      mitigation: "Implement async input before group discussions (Slack thread, doc comments). Explicitly invite Josh's perspective before closing decisions. Use silent brainstorming techniques (write first, then discuss)."
    }
  ];

  const severityColors = {
    critical: { bg: "bg-rose-500/10", border: "border-rose-500/40", text: "text-rose-400", badge: "bg-rose-500/20 text-rose-300" },
    high: { bg: "bg-amber-500/10", border: "border-amber-500/40", text: "text-amber-400", badge: "bg-amber-500/20 text-amber-300" },
    moderate: { bg: "bg-sky-500/10", border: "border-sky-500/40", text: "text-sky-400", badge: "bg-sky-500/20 text-sky-300" }
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Structural vulnerabilities identified from assessment data. These aren't flaws — they're patterns to be aware of and manage intentionally.</p>

      {/* Severity Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-rose-400">{risks.filter(r => r.severity === "critical").length}</div>
          <div className="text-rose-400 text-xs font-medium uppercase">Critical</div>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{risks.filter(r => r.severity === "high").length}</div>
          <div className="text-amber-400 text-xs font-medium uppercase">High</div>
        </div>
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-sky-400">{risks.filter(r => r.severity === "moderate").length}</div>
          <div className="text-sky-400 text-xs font-medium uppercase">Moderate</div>
        </div>
      </div>

      {/* Risk Cards */}
      {risks.map((risk, i) => {
        const c = severityColors[risk.severity];
        return (
          <div key={i} className={`${c.bg} border ${c.border} rounded-xl p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.badge}`}>{risk.severity}</span>
              <h3 className="text-white font-semibold">{risk.title}</h3>
            </div>
            <div className={`text-xs ${c.text} font-mono mb-3`}>{risk.metric}</div>
            <div className="text-slate-300 text-sm mb-3">{risk.description}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-900/40 rounded-lg p-3">
                <div className="text-rose-400 text-xs font-medium uppercase mb-1">Impact if Unmanaged</div>
                <div className="text-slate-300 text-xs">{risk.impact}</div>
              </div>
              <div className="bg-slate-900/40 rounded-lg p-3">
                <div className="text-emerald-400 text-xs font-medium uppercase mb-1">Recommended Action</div>
                <div className="text-slate-300 text-xs">{risk.mitigation}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ===== TAB: MEETING OPTIMIZER =====
const meetingTypes = [
  {
    name: "Strategy / Vision",
    description: "Setting direction, exploring opportunities, long-range planning",
    needed: ["W", "I", "D"],
    voices: ["Pioneer", "Creative"],
    recommended: ["JS", "AR", "CZ"],
    optional: ["EB"],
    why: "Josh (W/D) identifies the right problems, Alex (W/I) generates possibilities, Caleb (G/I) connects to purpose. Eric optional for commitment authority."
  },
  {
    name: "Execution / Sprint Planning",
    description: "Breaking work into tasks, assigning owners, setting deadlines",
    needed: ["G", "D", "T"],
    voices: [],
    recommended: ["EB", "JS", "DZ"],
    optional: ["CZ"],
    why: "Eric (G/T) drives to deadlines, Josh (D) evaluates feasibility, David (D/I) architects the solution. Caleb optional for team alignment."
  },
  {
    name: "Brainstorm / Ideation",
    description: "Generating new ideas, exploring possibilities, creative problem-solving",
    needed: ["W", "I"],
    voices: ["Pioneer", "Creative"],
    recommended: ["AR", "CZ", "JS", "OB"],
    optional: ["DZ"],
    why: "Alex + Caleb are the idea engine. Josh adds strategic Wonder. Owen's debate sharpens ideas. David can evaluate afterward."
  },
  {
    name: "Client / Sales Strategy",
    description: "Planning outreach, reviewing pipeline, refining messaging",
    needed: ["G", "I", "D"],
    voices: ["Connector"],
    recommended: ["DZ", "OB", "CZ"],
    optional: ["AR", "EB"],
    why: "David and Owen are the BDRs — they own the pipeline. Caleb connects to customer experience. Alex optional for messaging, Eric for commitment."
  },
  {
    name: "Problem Solving / IDS",
    description: "Identifying, discussing, and solving specific issues",
    needed: ["W", "D", "G"],
    voices: [],
    recommended: ["JS", "EB", "DZ"],
    optional: ["CZ"],
    why: "Josh (W/D) identifies root cause, David (I/D) invents solutions, Eric (G/T) drives to resolution. Caleb optional for alignment."
  },
  {
    name: "Team Check-in / Retro",
    description: "Culture, morale, team health, interpersonal dynamics",
    needed: ["E", "G"],
    voices: ["Connector", "Nurturer"],
    recommended: ["CZ", "DZ"],
    optional: ["EB", "AR"],
    why: "Caleb (Nurturer/Connector) reads the room. David (Connector) builds trust. NOTE: This is the team's weakest meeting type — no E geniuses. Be extra intentional."
  }
];

function MeetingTab() {
  const [selected, setSelected] = useState(0);
  const meeting = meetingTypes[selected];

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Optimal team composition for different meeting types, based on Working Genius pipeline needs and voice requirements.</p>

      {/* Meeting type selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {meetingTypes.map((mt, i) => (
          <button key={i} onClick={() => setSelected(i)}
            className={`text-left px-3 py-3 rounded-lg border transition-all ${selected === i ? "bg-slate-700 border-cyan-500/50 text-white" : "bg-slate-800/30 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"}`}>
            <div className="text-sm font-medium">{mt.name}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{mt.description}</div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-1">{meeting.name}</h3>
        <p className="text-slate-400 text-sm mb-5">{meeting.description}</p>

        {/* WG needs */}
        <div className="mb-5">
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Working Genius Needed</div>
          <div className="flex gap-2">
            {meeting.needed.map(code => {
              const wg = wgTypes.find(w => w.code === code);
              return (
                <div key={code} className="bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-center">
                  <div className="text-white font-bold">{code}</div>
                  <div className="text-slate-400 text-[10px]">{wg?.name}</div>
                </div>
              );
            })}
            {meeting.voices.length > 0 && (
              <>
                <div className="flex items-center text-slate-600 px-1">+</div>
                {meeting.voices.map(v => (
                  <div key={v} className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-3 py-2 text-center">
                    <div className="text-indigo-300 text-sm font-medium">{v}</div>
                    <div className="text-slate-500 text-[10px]">voice</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Recommended attendees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
            <div className="text-emerald-400 text-xs font-medium uppercase tracking-wider mb-3">Recommended (Core)</div>
            <div className="flex flex-wrap gap-2">
              {meeting.recommended.map(initials => {
                const person = team.find(p => p.initials === initials);
                return person ? (
                  <div key={initials} className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <Avatar person={person} size="sm" />
                    <div>
                      <div className="text-white text-sm font-medium">{person.name.split(" ")[0]}</div>
                      <div className="text-slate-500 text-[10px]">
                        {person.wg ? person.wg.genius.join("/") : "—"}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
          <div className="bg-slate-700/20 border border-slate-700 rounded-lg p-4">
            <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">Optional (Add if available)</div>
            <div className="flex flex-wrap gap-2">
              {meeting.optional.map(initials => {
                const person = team.find(p => p.initials === initials);
                return person ? (
                  <div key={initials} className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <Avatar person={person} size="sm" />
                    <div>
                      <div className="text-slate-300 text-sm font-medium">{person.name.split(" ")[0]}</div>
                      <div className="text-slate-500 text-[10px]">
                        {person.wg ? person.wg.genius.join("/") : "—"}
                      </div>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Rationale */}
        <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mb-5">
          <div className="text-cyan-400 text-xs font-medium uppercase tracking-wider mb-1">Why This Composition</div>
          <div className="text-slate-300 text-sm">{meeting.why}</div>
        </div>

        {/* Coverage Analysis */}
        <div>
          <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">Pipeline Coverage for This Meeting</div>
          <div className="flex gap-1">
            {wgTypes.map(type => {
              const attendees = meeting.recommended.map(i => team.find(p => p.initials === i)).filter(Boolean);
              const hasGenius = attendees.some(p => p.wg?.genius.includes(type.code));
              const hasComp = attendees.some(p => p.wg?.competency.includes(type.code));
              const isNeeded = meeting.needed.includes(type.code);
              return (
                <div key={type.code} className={`flex-1 rounded-lg p-2 text-center border ${
                  hasGenius ? "bg-emerald-500/20 border-emerald-500/40" :
                  hasComp ? "bg-amber-500/10 border-amber-500/30" :
                  isNeeded ? "bg-rose-500/10 border-rose-500/30" :
                  "bg-slate-800/30 border-slate-700"
                }`}>
                  <div className={`font-bold text-sm ${hasGenius ? "text-emerald-400" : hasComp ? "text-amber-400" : isNeeded ? "text-rose-400" : "text-slate-600"}`}>{type.code}</div>
                  <div className="text-[9px] text-slate-500">{type.name}</div>
                  <div className={`text-[9px] mt-1 ${hasGenius ? "text-emerald-500" : hasComp ? "text-amber-500" : isNeeded ? "text-rose-500" : "text-slate-600"}`}>
                    {hasGenius ? "GENIUS" : hasComp ? "COMP" : isNeeded ? "GAP" : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== TAB: RESOURCES =====
const LLM_GUIDE_CONTENT = `# The Channel Companion — LLM Communication Guide

Use this document as a system prompt or context block when asking an AI to help you draft messages, emails, Slack messages, or talking points for a specific teammate. Paste the relevant section (or the whole doc) into your AI tool of choice.

---

## How to Use This

When drafting communication to a teammate, paste this prompt into your AI:

> I'm writing a [message/email/Slack/talking points] to [NAME] about [TOPIC]. Using the communication profile below, help me draft this in a way that will land well with them. Here's their profile:

Then paste the relevant person's section below.

---

## Eric Brooker — CEO

**Working Genius:** Galvanizing + Tenacity (genius), Invention + Enablement (competency), Discernment + Wonder (frustration)

**Communication Profile:**
- Eric is wired for action and completion. He rallies people and pushes things across the finish line.
- He processes quickly and has a high bias toward doing, not discussing.
- He can get frustrated by open-ended exploration without a clear direction.

**When writing to Eric:**
- Lead with the action or decision needed — put the ask in the first sentence
- Be concise: what's the situation, what do you recommend, what do you need from him
- Show momentum — frame things in terms of progress and next steps
- If sharing an idea, include at least a rough plan for execution
- Avoid: long preambles, excessive options without a recommendation, or "just thinking out loud" framing

**Example framing:**
- Good: "I want to move forward on X. Here's the plan: [steps]. I need you to [specific ask]. Can we lock this in by Thursday?"
- Avoid: "I've been thinking about a few different directions we could go and wanted to get your thoughts on the possibilities..."

---

## Alex Rollins — CMO

**Working Genius:** Wonder + Invention (genius), Discernment + Galvanizing (competency), Enablement + Tenacity (frustration)
**Five Voices:** Pioneer, Creative | **MBTI:** ENFP | **Enneagram:** 3w4

**Communication Profile:**
- Alex is wired to see what's possible and create original solutions. She thrives in open exploration.
- She processes by talking through possibilities and building on ideas collaboratively.
- She values originality and can lose energy when things feel routine or overly constrained.

**When writing to Alex:**
- Start with the big picture — what's the vision or opportunity?
- Use "what if" language to spark her thinking
- Give room for her to riff — don't over-specify the solution
- Appreciate the creativity in her ideas before pivoting to logistics
- If you need something concrete, frame it as: "Here's the canvas — what would you create?"
- Avoid: jumping straight to execution details, shutting down ideas before they're explored, or framing things as purely procedural

**Example framing:**
- Good: "I see an opportunity with X. I have a few instincts but I'd love your creative take — what if we approached it from [angle]?"
- Avoid: "We need to execute on X. Here are the exact steps I need you to follow."

---

## Caleb Zimmermann — Chief Experience Officer

**Working Genius:** Galvanizing + Invention (genius), Discernment + Enablement (competency), Wonder + Tenacity (frustration)
**Five Voices:** Creative, Connector, Nurturer | **MBTI:** ENFP | **Enneagram:** 3w2
**StrengthsFinder:** Competition, Connectedness, Individualization, Adaptability, Belief

**Communication Profile:**
- Caleb connects ideas to people and purpose. He invents solutions and rallies alignment around them.
- He values understanding the "why" and the human impact of decisions.
- He processes collaboratively — thinking out loud is how he lands on ideas.
- He's competitive and driven but also deeply relational.

**When writing to Caleb:**
- Connect the idea to people and purpose — who does this help and why does it matter?
- Collaborate openly — frame things as "let's figure this out together" rather than presenting fait accompli
- Build on his ideas before redirecting them
- If you disagree, lead with what you appreciate before the redirect
- If asking for a decision, frame it in terms of team impact and values alignment
- Avoid: skipping the "why," pushing to action without buy-in, or being dismissive of relational concerns

**Example framing:**
- Good: "I think this could really help [person/team/customer] because [reason]. Here's what I'm thinking — what would you add or change?"
- Avoid: "We need to do X. Here's the timeline. Let me know if you have questions."

---

## David Zimmermann — Business Development Representative

**Working Genius:** Invention + Discernment (genius), Galvanizing + Wonder (competency), Enablement + Tenacity (frustration)
**Five Voices:** Connector, Creative
**MCODE Motivations:** Excel, Realize The Vision, Maximize, Architect, Finish

**Communication Profile:**
- David creates and evaluates. He invents practical solutions and has strong instincts for what will actually work.
- He needs time to process — his best thinking comes after reflection, not in the moment.
- He's motivated by excellence, vision realization, and building things that last.
- He brings significant experience and depth to his evaluations.

**When writing to David:**
- Present the concept clearly, then give him space to process and respond
- Ask for his honest assessment — "what do you think, will this actually work?"
- Respect his experience by asking for input, not just assigning tasks
- If you need a quick response, flag that upfront so he can prioritize
- Frame challenges in terms of building something excellent — that's what motivates him
- Avoid: rushing decisions, dismissing his concerns, or expecting him to just "go with the flow" on important calls

**Example framing:**
- Good: "Here's what I'm considering for [X]. I'd value your take — does this hold up? What am I missing? No rush, but if you could get back to me by [time] that would help."
- Avoid: "We're doing X starting tomorrow. Just wanted to loop you in."

---

## Owen Brooker — Business Development Representative

**Five Voices:** Pioneer, Connector | **MBTI:** ENTP | **Enneagram:** 7w8
**Big Five:** Extraversion 98th, Openness 95th, Agreeableness 0th, Conscientiousness 1st, Neuroticism 5th

**Communication Profile:**
- Owen is wired for exploration and debate. He moves fast, challenges everything, and thinks by arguing.
- He is extremely extraverted and open to new experiences, with very low agreeableness — he will push back naturally.
- He thrives with autonomy and wilts under micromanagement.
- His pushback is how he processes — it's intellectual sparring, not personal opposition.

**When writing to Owen:**
- Lead with the challenge or problem — frame it as something to crack
- Give him autonomy over approach — tell him what needs to happen, not how
- Be direct — he respects candor and won't be offended by bluntness
- If you want buy-in, engage his competitive/debate instincts rather than asking for compliance
- Keep communications short and high-energy — he'll lose interest in long, detailed instructions
- Avoid: detailed step-by-step procedures, emotional framing without substance, or asking him to "just trust the process"

**Example framing:**
- Good: "Nobody's figured out how to crack [X] yet. I bet you could. Here's what I know — run with it and tell me what you find."
- Avoid: "Please follow this 10-step process for [X]. Let me know when each step is complete."

---

## Josh Schmidt — CTO

**Working Genius:** Wonder + Discernment (genius), Invention + Galvanizing (competency), Enablement + Tenacity (frustration)
**Five Voices:** Pioneer, Creative | **MBTI:** INTJ
**StrengthsFinder:** Strategic, Ideation, Command, Learner, Activator
**MCODE:** Gain Ownership, Serve, Establish | **PI:** Maverick

**Communication Profile:**
- Josh sees problems others miss and evaluates solutions with strategic precision.
- He thinks before he speaks — give him processing time and don't mistake quiet for disengagement.
- He values logic, evidence, and well-reasoned arguments over enthusiasm alone.
- He's motivated by ownership, building something that lasts, and strategic impact.
- Despite being more introverted, he's decisive and commands when he's ready.

**When writing to Josh:**
- Lead with the strategic rationale — "here's the problem, here's the data, here's what I think"
- Present your reasoning, then ask "what am I missing?" — he'll respect the intellectual openness
- Give context for changes — don't just announce new direction without explaining why
- If you need to move fast, acknowledge the trade-off: "I know we're moving faster than ideal — here's why"
- Frame ownership opportunities — he's motivated by building and owning outcomes
- Avoid: leading with pure emotion, changing direction without explanation, or rushing past the planning phase

**Example framing:**
- Good: "Strategically, I think we should [X] because [evidence/reasoning]. I see two risks: [A] and [B]. What's your read — am I thinking about this right?"
- Avoid: "I have a great feeling about X! Let's just go for it and figure it out as we go."

---

## Quick Reference Matrix

| Writing to... | Lead with... | Avoid... |
|---|---|---|
| **Eric** | The action plan and timeline | Open-ended exploration without direction |
| **Alex** | The vision and "what if" | Jumping to execution details too fast |
| **Caleb** | People impact and purpose | Skipping the "why" |
| **David** | The concept + space to evaluate | Rushing his assessment |
| **Owen** | The challenge to crack | Detailed step-by-step instructions |
| **Josh** | Strategic rationale + data | Leading with pure emotion |
`;

function ResourcesTab() {
  const [copied, setCopied] = useState(null);

  function downloadFile(content, filename) {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyToClipboard(content, label) {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="space-y-6">
      <p className="text-slate-400 text-sm">Downloadable resources for the team. Use the LLM guide with ChatGPT, Claude, or any AI tool to tailor communications to each teammate.</p>

      {/* LLM Communication Guide */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-lg">LLM Communication Guide</h3>
            <p className="text-slate-400 text-sm">Paste into any AI tool to get communication tailored to each teammate's personality</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => copyToClipboard(LLM_GUIDE_CONTENT, "llm")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${copied === "llm" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-slate-700 text-slate-300 border border-slate-600 hover:bg-slate-600"}`}>
              {copied === "llm" ? "Copied!" : "Copy All"}
            </button>
            <button onClick={() => downloadFile(LLM_GUIDE_CONTENT, "channel-companion-llm-guide.md")}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all">
              Download .md
            </button>
          </div>
        </div>

        {/* Per-person quick copy */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {team.map(person => {
            // Extract person-specific section from the guide
            const nameHeader = `## ${person.name}`;
            const startIdx = LLM_GUIDE_CONTENT.indexOf(nameHeader);
            const nextHeader = LLM_GUIDE_CONTENT.indexOf("\n---\n", startIdx + 1);
            const section = startIdx >= 0 ? LLM_GUIDE_CONTENT.slice(startIdx, nextHeader > startIdx ? nextHeader : undefined) : "";
            return (
              <button key={person.initials} onClick={() => copyToClipboard(section, person.initials)}
                className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${copied === person.initials ? "bg-emerald-500/10 border-emerald-500/40" : "bg-slate-800/30 border-slate-700 hover:border-slate-600"}`}>
                <Avatar person={person} size="sm" />
                <div className="text-left flex-1">
                  <div className="text-white text-sm font-medium">{person.name.split(" ")[0]}'s Profile</div>
                  <div className="text-slate-500 text-[10px]">{copied === person.initials ? "Copied!" : "Click to copy"}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-3">How to Use the LLM Guide</h3>
        <div className="space-y-3 text-slate-300 text-sm">
          <div className="pl-3 border-l-2 border-cyan-500/40">
            <span className="text-cyan-300 font-medium">Step 1:</span> Copy the full guide or a specific person's profile using the buttons above
          </div>
          <div className="pl-3 border-l-2 border-cyan-500/40">
            <span className="text-cyan-300 font-medium">Step 2:</span> Open your AI tool (ChatGPT, Claude, etc.) and paste the profile
          </div>
          <div className="pl-3 border-l-2 border-cyan-500/40">
            <span className="text-cyan-300 font-medium">Step 3:</span> Tell the AI what you want to write: "I'm writing a Slack message to [Name] about [topic]. Using the profile above, help me draft this."
          </div>
          <div className="pl-3 border-l-2 border-cyan-500/40">
            <span className="text-cyan-300 font-medium">Step 4:</span> The AI will tailor the tone, structure, and framing to match what lands best with that person
          </div>
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
  { id: "deepdive", label: "Deep Dive" },
  { id: "risk", label: "Team Risk" },
  { id: "meeting", label: "Meeting Optimizer" },
  { id: "comm", label: "Communication" },
  { id: "resources", label: "Resources" },
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
        {activeTab === "deepdive" && <DeepDiveTab />}
        {activeTab === "risk" && <RiskTab />}
        {activeTab === "meeting" && <MeetingTab />}
        {activeTab === "comm" && <CommTab />}
        {activeTab === "resources" && <ResourcesTab />}
        {activeTab === "exercise" && <ExerciseTab />}
      </div>

      {/* Footer */}
      <div className="text-center text-slate-600 text-xs py-4">
        Built from Working Genius, Five Voices, MBTI, Enneagram, StrengthsFinder, MCODE, and PI assessments. February 2026.
      </div>
    </div>
  );
}