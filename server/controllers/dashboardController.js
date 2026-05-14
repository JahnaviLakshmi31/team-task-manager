const db = require("../db/db");
const getDashboardData = async (req,res)=>{
    const totalTasksQuery = "SELECT COUNT(*) AS totalTasks FROM tasks";
    const completedTasksQuery = "SELECT COUNT(*) AS completedTasks FROM tasks WHERE status = 'Done'";
    const pendingTasksQuery = "SELECT COUNT(*) AS pendingTasks FROM tasks WHERE status != 'Done'";
    const overdueTasksQuery = "SELECT COUNT(*) AS overdueTasks FROM tasks WHERE due_date < CURDATE() AND status != 'Done'";
// callback hell ?

/* 
try{
    connection = await db.connect;
    const [result1] = await connection.query("", []);
    const [result2] = await connection.query("", []);
    const [result3] = await connection.query("", []);
    const [result4] = await connection.query("", []);
}catch(err){
consoe.log(err)
}
async.waterfall([
    ()=>{
        db.query(totalTasksQuery, (err, totalResult) => {)
    },
    ()=>{
        db.query(totalTasksQuery, (err, totalResult) => {)
    },
    ()=>{
        db.query(totalTasksQuery, (err, totalResult) => {)
    },

], ()=>{
    })
*/
    db.query(totalTasksQuery, (err, totalResult) => {
        db.query(completedTasksQuery, (err, completedResult) => {
            db.query(pendingTasksQuery, (err, pendingResult) => {
                db.query(overdueTasksQuery, (err, overdueResult) => {
                    if(err){
                        return res.status(500).json({
                             message: "Error fetching records"
                        });
                    }
                    return res.json({
                        totalTasks:
                            totalResult?.[0]?.totalTasks,
                        completedTasks:
                            completedResult?.[0]?.completedTasks,
                        pendingTasks:
                            pendingResult?.[0]?.pendingTasks,
                        overdueTasks:
                            overdueResult?.[0]?.overdueTasks
                    });
                });
            });
        });
    });
};
module.exports = {getDashboardData};