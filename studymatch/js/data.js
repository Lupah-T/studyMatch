const SeedData={
 initialize(force=false){
  if(force || !Storage.get('initialized',null)){
   const users=[
    {id:'u1',name:'Amina Njeri',email:'amina@mut.ac.ke',role:'student',passwordHash:'',profileId:'p1'},
    {id:'u2',name:'Brian Kiptoo',email:'brian@mut.ac.ke',role:'student',passwordHash:'',profileId:'p2'},
    {id:'u3',name:'Carol Wanjiku',email:'carol@mut.ac.ke',role:'student',passwordHash:'',profileId:'p3'},
    {id:'u4',name:'Dennis Mwangi',email:'dennis@mut.ac.ke',role:'student',passwordHash:'',profileId:'p4'},
    {id:'u5',name:'Esther Muthoni',email:'esther@mut.ac.ke',role:'student',passwordHash:'',profileId:'p5'},
    {id:'u6',name:'Felix Otieno',email:'felix@mut.ac.ke',role:'student',passwordHash:'',profileId:'p6'},
    {id:'u7',name:'Grace Wambui',email:'grace@mut.ac.ke',role:'student',passwordHash:'',profileId:'p7'},
    {id:'u8',name:'Hassan Ali',email:'hassan@mut.ac.ke',role:'student',passwordHash:'',profileId:'p8'},
    {id:'u9',name:'Irene Chebet',email:'irene@mut.ac.ke',role:'student',passwordHash:'',profileId:'p9'},
    {id:'u10',name:'James Kamau',email:'james@mut.ac.ke',role:'student',passwordHash:'',profileId:'p10'},
    {id:'admin1',name:'MUT Platform Admin',email:'admin@mut.ac.ke',role:'admin',passwordHash:''}
   ];
   const profiles=[
    {id:'p1',userId:'u1',course:'BSc Computer Science',year:'Year 3',units:['Data Structures','Database Systems','Software Engineering'],times:['Evenings','Weekends'],mode:'Both',learning:['Group Discussion','Peer Teaching'],goals:['Exam Preparation','Concept Understanding']},
    {id:'p2',userId:'u2',course:'BSc Computer Science',year:'Year 3',units:['Data Structures','Operating Systems','Software Engineering'],times:['Weekends','Afternoons'],mode:'Physical',learning:['Peer Teaching','Collaborative Projects'],goals:['Exam Preparation','Assignment Collaboration']},
    {id:'p3',userId:'u3',course:'BSc Information Technology',year:'Year 2',units:['Database Systems','Web Technologies','Networking'],times:['Evenings','Weekdays'],mode:'Online',learning:['Group Discussion','Individual Practice'],goals:['Concept Understanding','General Revision']},
    {id:'p4',userId:'u4',course:'BSc Computer Science',year:'Year 3',units:['Data Structures','Database Systems','Artificial Intelligence'],times:['Evenings','Weekends'],mode:'Both',learning:['Group Discussion','Peer Teaching'],goals:['Exam Preparation','Concept Understanding']},
    {id:'p5',userId:'u5',course:'BSc Software Engineering',year:'Year 2',units:['Software Engineering','Web Technologies','Database Systems'],times:['Afternoons','Weekends'],mode:'Both',learning:['Collaborative Projects','Group Discussion'],goals:['Assignment Collaboration','Concept Understanding']},
    {id:'p6',userId:'u6',course:'BSc Information Technology',year:'Year 1',units:['Networking','Web Technologies','Computer Fundamentals'],times:['Weekdays','Evenings'],mode:'Online',learning:['Individual Practice','Group Discussion'],goals:['General Revision','Concept Understanding']},
    {id:'p7',userId:'u7',course:'BSc Mathematics',year:'Year 2',units:['Linear Algebra','Calculus','Discrete Mathematics'],times:['Weekends','Mornings'],mode:'Physical',learning:['Peer Teaching','Group Discussion'],goals:['Exam Preparation','Concept Understanding']},
    {id:'p8',userId:'u8',course:'BSc Computer Science',year:'Year 4',units:['Artificial Intelligence','Data Structures','Software Engineering'],times:['Evenings','Afternoons'],mode:'Both',learning:['Collaborative Projects','Peer Teaching'],goals:['Assignment Collaboration','Exam Preparation']},
    {id:'p9',userId:'u9',course:'BSc Information Technology',year:'Year 3',units:['Networking','Database Systems','Cybersecurity'],times:['Weekends','Evenings'],mode:'Online',learning:['Individual Practice','Peer Teaching'],goals:['Exam Preparation','General Revision']},
    {id:'p10',userId:'u10',course:'BSc Software Engineering',year:'Year 2',units:['Software Engineering','Web Technologies','Human Computer Interaction'],times:['Weekdays','Afternoons'],mode:'Physical',learning:['Collaborative Projects','Group Discussion'],goals:['Assignment Collaboration','Concept Understanding']}
   ];
   const groups=[
    {id:'g1',name:'Data Structures Sprint',description:'Weekly problem-solving and interview practice.',units:['Data Structures'],capacity:8,mode:'Physical',creatorId:'u1',members:['u1','u2','u4'],status:'active'},
    {id:'g2',name:'Database Systems Lab',description:'SQL exercises and database design reviews.',units:['Database Systems'],capacity:10,mode:'Online',creatorId:'u3',members:['u3','u5','u9'],status:'active'},
    {id:'g3',name:'Software Builders',description:'Collaborative software project planning and peer reviews.',units:['Software Engineering'],capacity:6,mode:'Both',creatorId:'u5',members:['u1','u5','u10','u2'],status:'active'},
    {id:'g4',name:'Networking & Security',description:'Packet analysis, subnetting and cybersecurity basics.',units:['Networking','Cybersecurity'],capacity:8,mode:'Online',creatorId:'u9',members:['u9','u6','u3'],status:'active'},
    {id:'g5',name:'MUT Math Circle',description:'A supportive group for mathematics units.',units:['Linear Algebra','Calculus','Discrete Mathematics'],capacity:12,mode:'Physical',creatorId:'u7',members:['u7'],status:'active'}
   ];
   const now=new Date();const future=(d,h,m)=>{const x=new Date(now);x.setDate(x.getDate()+d);x.setHours(h,m,0,0);return x};
   const sessions=[
    {id:'s1',title:'Data Structures Lab Review',groupId:'g1',unit:'Data Structures',date:future(2,16,0).toISOString().slice(0,10),start:'16:00',end:'18:00',mode:'Physical',location:'ICT Centre Room 2',description:'Review trees and graphs.',creatorId:'u1',status:'scheduled'},
    {id:'s2',title:'SQL Practice Session',groupId:'g2',unit:'Database Systems',date:future(4,18,30).toISOString().slice(0,10),start:'18:30',end:'20:00',mode:'Online',location:'Google Meet link shared in group',description:'Joins and normalisation exercises.',creatorId:'u3',status:'scheduled'},
    {id:'s3',title:'Sprint Planning',groupId:'g3',unit:'Software Engineering',date:future(-2,14,0).toISOString().slice(0,10),start:'14:00',end:'16:00',mode:'Physical',location:'Engineering Block F-4',description:'Past planning session.',creatorId:'u5',status:'scheduled'}
   ];
   Storage.set('users',users);Storage.set('profiles',profiles);Storage.set('groups',groups);Storage.set('sessions',sessions);Storage.set('invitations',[]);Storage.set('notifications',[]);Storage.set('activity',[
    {text:'Data Structures Sprint welcomed two new members',time:'Today, 09:30'},
    {text:'Database Systems Lab scheduled a new session',time:'Yesterday, 17:10'},
    {text:'Five students updated their study profiles',time:'Nov 20'}
   ]);Storage.set('initialized',true);
  }
 }
};
