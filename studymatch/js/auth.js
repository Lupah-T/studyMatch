const Auth={
 async hash(password){const enc=new TextEncoder();const data=await crypto.subtle.digest('SHA-256',enc.encode(password));return Array.from(new Uint8Array(data)).map(b=>b.toString(16).padStart(2,'0')).join('')},
 async initialize(){
  let users=Storage.get('users',[]);let changed=false;
  for(const u of users){if(!u.passwordHash){u.passwordHash=await this.hash(u.role==='admin'?'Admin123!':'Study123!');changed=true}}
  if(changed)Storage.set('users',users);
 },
 current(){return Storage.get('session',null)},
 async register({name,email,password,role='student'}){if(!name||!email||password.length<8)throw new Error('Complete all fields; password must be at least 8 characters.');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))throw new Error('Enter a valid email address.');const users=Storage.get('users',[]);if(users.some(u=>u.email.toLowerCase()===email.trim().toLowerCase()))throw new Error('An account with this email already exists.');
  const id=Storage.uid('u');const hash=await this.hash(password);const user={id,name:name.trim(),email:email.trim().toLowerCase(),role,passwordHash:hash};users.push(user);Storage.set('users',users);Storage.set('session',{id:user.id});return user;
 },
 async login(email,password){const users=Storage.get('users',[]);const hash=await this.hash(password);const user=users.find(u=>u.email.toLowerCase()===email.trim().toLowerCase()&&u.passwordHash===hash);if(!user)throw new Error('Invalid email or password.');Storage.set('session',{id:user.id});return user},
 logout(){Storage.remove('session')},
 requireRole(role){const u=this.getUser();return u&&(role==='student'?u.role==='student'||u.role==='admin':u.role===role)},
 getUser(){const s=this.current();return s?Storage.get('users',[]).find(u=>u.id===s.id)||null:null},
 getProfile(){const u=this.getUser();return u?Storage.get('profiles',[]).find(p=>p.userId===u.id)||null:null}
};
