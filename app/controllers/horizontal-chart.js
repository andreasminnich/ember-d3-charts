import Ember from 'ember';

export default Ember.Controller.extend({
  data: [1, 2, 3],

  rand: function() {
    return Math.floor(50* Math.random());
  },

  actions: {
    changeData: function() {
      var numData = Math.floor(5* Math.random());
      var data = []
      for (var idx=0; idx < numData; idx++) {
        data.push(this.rand());
      }
      this.set('data', data);
    }
  }
});
