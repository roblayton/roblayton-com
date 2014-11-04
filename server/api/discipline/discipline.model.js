'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DisciplineSchema = new Schema({
  name: String,
  info: String,
  type: String,
  skills: [{type: Schema.ObjectId, ref: 'Skill'}] 
});

DisciplineSchema.statics = {
  load: function (cb) {
    this.find({}).populate('skills').exec(cb);
  },
  attach: function (discId, skillId, cb) {
      var self = this;
      this.findById(discId, function (err, discipline) {
        discipline.skills.push(new mongoose.Types.ObjectId(skillId));
        discipline.save(function(err) {
            self.find({}).populate('skills').exec(cb);
        });
      });
  },
  detach: function (discId, skillId, cb) {
      var self = this;
      this.findById(discId, function (err, discipline) {
        var objId = new mongoose.Types.ObjectId(skillId);
        var index = discipline.skills.indexOf(objId);
        if (index > -1) {
            discipline.skills.splice(index, 1);
        }
        discipline.save(function(err) {
            self.find({}).populate('skills').exec(cb);
        });
      });
  }
};

module.exports = mongoose.model('Discipline', DisciplineSchema);
