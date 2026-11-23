const Sessions={
 all(){return Storage.get('sessions',[])},
 validate(d){const e={};if(!d.title?.trim())e.title='Session title is required.';if(!d.groupId)e.groupId='Select a study group.';if(!d.unit)e.unit='Select an academic unit.';if(!d.date)e.date='Select a date.';if(!d.start)e.start='Select a start time.';if(!d.end)e.end='Select an end time.';if(!d.mode)e.mode='Select a study mode.';if(d.mode==='Physical'&&!d.location?.trim())e.location='Physical location is required.';if(d.mode==='Online'&&!d.location?.trim())e.location='Online meeting details are required.';
  if(d.date&&d.start){const start=new Date(d.date+'T'+d.start+':00');if(start<=new Date())e.date='A session cannot be scheduled in the past.'}if(d.start&&d.end&&d.end<=d.start)e.end='End time must be later than start time.';return e
 },
 create(d){const u=Auth.getUser();const e=this.validate(d);if(Object.keys(e).length)return {errors:e};const s={id:Storage.uid('s'),title:d.title.trim(),groupId:d.groupId,unit:d.unit,date:d.date,start:d.start,end:d.end,mode:d.mode,location:d.location.trim(),description:(d.description||'').trim(),creatorId:u.id,status:'scheduled'};const all=this.all();all.push(s);Storage.set('sessions',all);App.addActivity(`Scheduled ${s.title}`);return {session:s}},
 cancel(id){const u=Auth.getUser();const all=this.all();const s=all.find(x=>x.id===id);if(!s||s.creatorId!==u.id&&u.role!=='admin')return {error:'Not authorized.'};s.status='cancelled';Storage.set('sessions',all);App.addActivity(`Cancelled ${s.title}`);return {session:s}},
 authorized(s){const u=Auth.getUser();return !!u&&(s.creatorId===u.id||u.role==='admin')},
 upcoming(){const now=new Date();return this.all().filter(s=>s.status!=='cancelled'&&new Date(s.date+'T'+(s.end||'23:59'))>=now).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start))},
 past(){const now=new Date();return this.all().filter(s=>s.status==='cancelled'||new Date(s.date+'T'+(s.end||'23:59'))<now).sort((a,b)=>(b.date+b.start).localeCompare(a.date+a.start))}
};
