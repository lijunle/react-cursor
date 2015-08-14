/* global describe, it, expect */

var React = require('react');
var Cursor = require('../Cursor');

'use strict';

function renderComponentWithState(initialState) {
  var descriptor = React.createClass({
    getInitialState: function () {
      return {};
    },
    render: function () {
      this.setState(this.props.cursor.value);
      return React.DOM.pre({}, JSON.stringify(this.props.cursor.value));
    }
  });

  var TestComponent = React.createFactory(descriptor);
  var cursor = Cursor.build(initialState);
  var cmp = TestComponent({ cursor: cursor });
  var div = document.createElement('div');

  cursor.init(function () {
    React.render(cmp, div);
  });

  return [cmp, cursor];
}

describe('Cursor', function () {
  it('Can load the library in the unit tests', function () {
    expect(Cursor).not.equal(undefined);
    expect(Cursor.debug).to.equal(false);
  });

  it("should pass to React component instance as props", function () {
    var [cmp] = renderComponentWithState({ a: 42 });
    expect(cmp.props.cursor.value.a).to.equal(42);
    expect(cmp.state.a).to.equal(42);
  });

  it('cursors can refine by path', function () {
    var [, c] = renderComponentWithState({ a: 42 });
    expect(c.value.a).to.equal(42);
    expect(c.refine('a').value).to.equal(42);
  });

  it('method set delegates to $set operation', function () {
    var [cmp, c] = renderComponentWithState({a: 42});
    var a = c.refine('a');
    a.set(53);
    expect(cmp.state.a).to.equal(53);
  });

  it('method push delegates to $push operation', function () {
    var [cmp, c] = renderComponentWithState({a: [1, 2, 3]});
    var a = c.refine('a');
    a.push([4]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4]);
    a.push([5, 6]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('method push delegates to $unshift operation', function () {
    var [cmp, c] = renderComponentWithState({a: [4, 5, 6]});
    var a = c.refine('a');
    a.unshift([3]);
    expect(cmp.state.a).to.deep.equal([3, 4, 5, 6]);
    a.unshift([2, 1]);
    expect(cmp.state.a).to.deep.equal([1, 2, 3, 4, 5, 6]);
  });

  it('method splice delegates to $splice operation', function () {
    var [cmp, c] = renderComponentWithState({a: [1, 2, 3]});
    var a = c.refine('a');
    a.splice([[1, 1, 4]]);
    expect(cmp.state.a).to.deep.equal([1, 4, 3]);
    a.splice([[0, 1, 6, 5], [4, 0, 2, 1]]);
    expect(cmp.state.a).to.deep.equal([6, 5, 4, 3, 2, 1]);
  });

  it('method merge delegates to $merge operation', function () {
    var [cmp, c] = renderComponentWithState({a: {b: 64}});
    var a = c.refine('a');
    a.merge({ c: 72 });
    expect(cmp.state.a).to.deep.equal({ b: 64, c: 72});
  });

  it('method apply delegates to $apply operation', function () {
    var [cmp, c] = renderComponentWithState({a: 64 });
    var a = c.refine('a');
    a.apply(function (prevState) {
      return function (x) { return x / 8 }
    });
    expect(cmp.state.a).to.equal(8);
  });
});
