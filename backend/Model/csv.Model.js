var mongoose  =  require('mongoose');  
  
var csvSchema = new mongoose.Schema({  
    question:{  
        type:String  
    },  
    answer:{  
        type:String  
    },
    option1:{
        type:String
    },
    option2:{
        type:String
    },
    option3:{
        type:String
    },
    type:{
        type:String
    }
});  
  
module.exports = mongoose.model('QuizRecords',csvSchema); 