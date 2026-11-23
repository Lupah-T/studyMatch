const fs=require('fs');const vm=require('vm');const source=fs.readFileSync(require('path').join(__dirname,'../js/matching.js'),'utf8')+'\nthis.Matching=Matching;';const context={};vm.createContext(context);vm.runInContext(source,context);const Matching=context.Matching;
let passed=0;function test(name,fn){try{fn();console.log('PASS',name);passed++}catch(e){console.error('FAIL',name,e.message);process.exitCode=1}}
function close(a,b){if(Math.abs(a-b)>1e-9)throw new Error(`${a} !== ${b}`)}
const a={units:['Software Engineering','Computer Networks','Mobile Application Development'],times:['Evening','Weekend'],mode:'Physical',goals:['Exam Preparation']};
const b={units:['Software Engineering','Computer Networks','Database Systems'],times:['Evening','Weekend'],mode:'Both',goals:['Exam Preparation']};
const result=Matching.calculateCompatibility(a,b);
test('worked example is 77.5%',()=>{close(result.total,77.5);close(result.units.score,50);close(result.availability.score,100);close(result.mode.score,100);close(result.goalCompatibility?.score||result.goals.score,100)});
test('contributions add to total',()=>close(result.contributions.units+result.contributions.availability+result.contributions.mode+result.contributions.goals,77.5));
test('identical units and availability score 100 for Jaccard factors',()=>{const c=Matching.calculateCompatibility(a,{...a});close(c.units.score,100);close(c.availability.score,100)});
test('no shared units is 0',()=>close(Matching.calculateUnitSimilarity(a,{units:['Calculus'],times:[],mode:'',goals:[]}).score,0));
test('partial availability uses Jaccard',()=>close(Matching.calculateScheduleCompatibility({times:['Morning','Evening','Weekend']},{times:['Evening','Afternoon']}).score,25));
test('Physical vs Online is 0',()=>close(Matching.calculateStudyModeCompatibility({mode:'Physical'},{mode:'Online'}).score,0));
test('Physical vs Both is 100',()=>close(Matching.calculateStudyModeCompatibility({mode:'Physical'},{mode:'Both'}).score,100));
test('identical goal Jaccard is 100',()=>close(Matching.calculateGoalCompatibility({goals:['Exam Preparation']},{goals:['Exam Preparation']}).score,100));
test('different goal Jaccard is 0',()=>close(Matching.calculateGoalCompatibility({goals:['Exam Preparation']},{goals:['Assignment Completion']}).score,0));
test('incomplete profile is excluded',()=>{if(Matching.calculateCompatibility(a,{units:[],times:[],mode:'',goals:[]})!==null)throw new Error('Incomplete profile should return null')});
console.log(`${passed} matching tests passed`);
