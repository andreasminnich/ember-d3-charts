import Ember from 'ember';

const BAR_HEIGHT = 20;

export default Ember.Component.extend({

  width: 420,
  height: Ember.computed('data.length', function() {
    return this.get('data.length') * BAR_HEIGHT;
  }),

  x: Ember.computed('data.@each', 'width', function() {
    if (!this.get('data')) { return 0; }
    return d3.scale.linear()
      .domain([0, d3.max(this.get('data'))])
      .range([0, this.get('width')]);
  }),

  createChart: Ember.on('didInsertElement', function() {
    this.createSvg();
    this.updateBars();
  }),

  createSvg: function() {
    var chart = d3.select(this.element).append('svg')
                  .attr('width', this.get('width'));
    this.set('chart', chart);
  },

  updateBars: Ember.observer('data.@each', function() {
    var selection = this.get('chart').selectAll('rect')
      .data(this.get('data') || 0);

    this.addBars(selection);
    this.scaleBars(selection);
    this.removeBars(selection);
  }),

  addBars: function(selection) {
    selection.enter()
      .append('rect')
        .attr('transform', (d, i) => `translate(0, ${i*BAR_HEIGHT})`)
        .attr('height', BAR_HEIGHT - 1);
  },

  scaleBars: function(selection) {
    selection.transition()
      .attr('width', this.get('x'));
  },

  removeBars: function(selection) {
    selection.exit()
      .remove();
  }
});
