const Matching={
 intersection(a=[],b=[]){const al=new Set(a.map(String));return b.filter(v=>al.has(String(v)))},
 percentOverlap(a,b){if(!a?.length||!b?.length)return 0;return this.intersection(a,b).length/Math.max(a.length,b.length)*100},
 modeScore(a,b){if(a===b)return 100;if(a==='Both'||b==='Both')return 85;return 20},
 goalScore(a,b){if(!a?.length||!b?.length)return 0;return this.intersection(a,b).length/Math.max(a.length,b.length)*100},
 score(candidate){const me=Auth.getProfile();if(!me||!candidate||!Profile.complete(me)||!Profile.complete(candidate))return null;const units=this.percentOverlap(me.units,candidate.units);const availability=this.percentOverlap(me.times,candidate.times);const mode=this.modeScore(me.mode,candidate.mode);const goals=this.goalScore(me.goals,candidate.goals);const total=units*.45+availability*.30+mode*.15+goals*.10;return {total:Math.round(total),units,availability,mode,goals}},
 ranked(){const me=Auth.getUser();if(!me)return [];const profiles=Storage.get('profiles',[]);const users=Storage.get('users',[]);return profiles.filter(p=>p.userId!==me.id&&Profile.complete(p)).map(p=>({profile:p,user:users.find(u=>u.id===p.userId),score:this.score(p)})).filter(r=>r.user&&r.score).sort((a,b)=>b.score.total-a.score.total)}
};
