const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alias: { type: String, unique: true }
}, {
  timestamps: true
});

// incorporate this into post-save hook
// Trim last 

urlSchema.pre('save', function createHash(next) {

  if(this.alias)
    return next();
     
  const itemId = this._id.toString();
  const s = itemId.substr(itemId.length - 6);
  var a = 1, c = 0, h, o;

  if(s) {
    a = 0;
    /*jshint plusplus:false bitwise:false*/
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h);
      a = (a << 6 & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ c >> 21 : a;
    }
  }
  this.alias = a;
  next();
});


module.exports = mongoose.model('Url', urlSchema);
