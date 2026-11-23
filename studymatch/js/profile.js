const Profile={
 complete(p){return !!(p&&p.course&&p.year&&p.units?.length&&p.times?.length&&p.mode&&p.learning?.length&&p.goals?.length)},
 save(profile){const profiles=Storage.get('profiles',[]);const i=profiles.findIndex(p=>p.id===profile.id);if(i>=0)profiles[i]=profile;else profiles.push(profile);Storage.set('profiles',profiles)},
 validate(p){const errors={};if(!p.course)errors.course='Select a course.';if(!p.year)errors.year='Select an academic year.';if(!p.units?.length)errors.units='Select at least one academic unit.';if(!p.times?.length)errors.times='Select at least one available time.';if(!p.mode)errors.mode='Select a study mode.';if(!p.learning?.length)errors.learning='Select a learning method.';if(!p.goals?.length)errors.goals='Select at least one academic goal.';return errors},
 units:()=>['Data Structures','Database Systems','Software Engineering','Operating Systems','Web Technologies','Networking','Artificial Intelligence','Cybersecurity','Computer Fundamentals','Linear Algebra','Calculus','Discrete Mathematics','Human Computer Interaction']
};
