
//what we covered in this ->  token overlap + tag boost + popularity + recency

function tokenize(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function termFreq(tokens) {
  const tf = {};
  for (const t of tokens) tf[t] = (tf[t] || 0) + 1;
  return tf;
}

function dot(a, b) {
  let s = 0;
  for (const k in a) if (b[k]) s += a[k] * b[k];
  return s;
}
function mag(v) {
  return Math.sqrt(Object.values(v).reduce((acc, x) => acc + x * x, 0));
}
function cosine(a, b) {
  const d = dot(a, b);
  const m = mag(a) * mag(b);
  return m ? d / m : 0;
}


export function scoreEvent({ user = {}, event = {}, weights = { tags: 3, title: 1.2, desc: 1, popularity: 0.06, recency: 0.06 } }) {
  
  const userText = [
    ...(user.interests || []),
    ...(user.skills || []),
    user.bio || "",
    user.professionalGoal || ""
  ].join(" ");

  const tagsText = (event.tags || []).join(" ");
  const titleText = event.title || "";
  const descText = event.description || "";

  const userTok = tokenize(userText);
  const tagsTok = tokenize(tagsText);
  const titleTok = tokenize(titleText);
  const descTok = tokenize(descText);

  const userTf = termFreq(userTok);
  const eventTf = {};
  for (const t of tagsTok) eventTf[t] = (eventTf[t] || 0) + weights.tags;
  for (const t of titleTok) eventTf[t] = (eventTf[t] || 0) + weights.title;
  for (const t of descTok) eventTf[t] = (eventTf[t] || 0) + weights.desc;

  const vocab = new Set([...Object.keys(userTf), ...Object.keys(eventTf)]);
  const vUser = {}, vEvent = {};
  for (const k of vocab) {
    vUser[k] = userTf[k] || 0;
    vEvent[k] = eventTf[k] || 0;
  }

  const contentScore = cosine(vUser, vEvent); 

  
  const userInterestSet = new Set((user.interests || []).map(s => String(s).toLowerCase()));
  const tagExactMatch = (event.tags || []).some(t => userInterestSet.has(String(t).toLowerCase())) ? 1 : 0;

  
  const rsvp = Number(event.rsvpCount || event.rsvp || 0);
  const popularity = Math.tanh(rsvp / 50); 

  
  let recency = 0;
  if (event.time || event.date) {
    const eventTime = new Date(event.time || event.date);
    const days = (eventTime - new Date()) / (1000 * 60 * 60 * 24);
    recency = days >= 0 ? Math.max(0, 1 - days / 30) : 0;
  }

  
  let score = 0;
  score += contentScore * 0.6;            
  score += tagExactMatch * 0.25;          
  score += popularity * weights.popularity;
  score += recency * weights.recency;

  score = Math.min(1, score);

  return {
    score: Number(score.toFixed(4)),
    breakdown: {
      contentScore: Number(contentScore.toFixed(4)),
      tagExactMatch,
      popularity: Number(popularity.toFixed(4)),
      recency: Number(recency.toFixed(4))
    }
  };
}
