import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './base.css';
import './test.css';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';

const GridLayout = WidthProvider(ReactGridLayout);

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

var BasicLayout = React.createClass({
  getDefaultProps() {
    return {
      className: "layout",
      items: 20,
      rowHeight: 30,
      onLayoutChange: function () { },
      cols: 12
    };
  },

  getInitialState() {
    var layout = this.generateLayout();
    return {
      layout: layout
    };
  },

  generateDOM() {
    return _.map(_.range(this.props.items), function (i) {
      return (<div key={i}><span className="text">{i}</span></div>);
    });
  },

  generateLayout() {
    var p = this.props;
    return _.map(new Array(p.items), function (item, i) {
      var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return { x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i.toString() };
    });
  },

  onLayoutChange: function (layout) {
    this.props.onLayoutChange(layout);
  },

  render() {
    return (
      <GridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange}
        {...this.props}>
        {this.generateDOM()}
      </GridLayout>
    );
  }
});

render(<BasicLayout />, document.getElementById('root'));
