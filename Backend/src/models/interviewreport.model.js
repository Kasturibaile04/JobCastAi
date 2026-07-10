const mongoose = require("mongoose");

/**
 * - Job description schema : string
 * - resume text : string
 * - self description : string
 * 
 * MatchScore : Number 
 * 
 * Technical question : [{
 *  question : "",
 *  intenstion : "",
 *  answer : "",
 *  feedback : "",
 * }]
 * Behavioral question:[{
 *  question : "",
 *  intenstion : "",
 *  answer : "",
 *  feedback : "",
 * }]
 * 
 * Skill gaps :[{
 * skill : "",
 * severity : {
 * enum :[low,medium,high]
 * }}]
 * 
 * preparation plan:[{
 * day : Number,
 * topic : String,
 * tasks : String,
 * resources : String}]
 * 
 */
const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true,"Question is Required"]
    },
    intenstion : {
        type : String,
        required : [true,"Intenstion is Required"]
    },
    answer : {
        type : String,
        required : [true,"Answer is Required"]
    },
    feedback : {
        type : String,
        required : [true,"Feedback is Required"]
    }
},{
    _id : false
})
const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true,"Question is Required"]
    },
    intenstion : {
        type : String,
        required : [true,"Intenstion is Required"]
    },
    answer : {
        type : String,
        required : [true,"Answer is Required"]
    },
    feedback : {
        type : String,
        required : [true,"Feedback is Required"]
    }
},{
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true,"Skill is Required"]
    },
    severity : {
        type : String,
        enum : ["low","medium","high"],
        required : [true,"Severity is Required"]
    }
},{
    _id : false
})

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true,"Day is Required"]
    },
    topic : {
        type : String,
        required : [true,"Topic is Required"]
    },
    tasks : {
        type : String,
        required : [true,"Tasks is Required"]
    },
    resources : {
        type : String,
        required : [true,"Resources is Required"]
    }
},{
    _id : false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true,"Job description is Required"]
    },
    resume : {
        type : String,

    },
    selfDescription : {
        type : String,
    },

    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },

    technicalQuestions : [technicalQuestionSchema],
    behavioralQuestions : [behavioralQuestionSchema],
    skillGaps : [skillGapSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title : {
        type : String,
        required : [true,"Title is Required"]
    }
},
{
    timestamps : true
})

const interviewReportModel = mongoose.model("InterviewReport",interviewReportSchema)
module.exports = interviewReportModel