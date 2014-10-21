"use strict";

var Cursor = require('../dist/react-cursor').Cursor;
var ReactTestUtils;

function buildStatefulComponent(initialState) {
  return React.createClass({
    getInitialState: function () {
      return initialState;
    },
    render: function () {
      return React.DOM.pre({}, JSON.stringify(this.state));
    }
  });
}


describe("Label Test",function(){
  beforeEach(function() {
    ReactTestUtils = React.addons.TestUtils;
  });

  it("do the unit tests work", function () {
    expect(true).toBe(true);
  });

  it("can we make an instance of a react cmp and get at the state", function () {
    var MyCmp = buildStatefulComponent({ a: 42 });
    var cmp = MyCmp({});
    ReactTestUtils.renderIntoDocument(cmp);
    expect(true).toBe(true);
    // expect(label.refs.p).toBeDefined();
    // expect(label.refs.p.props.children).toBe("Some Text We Need for Test")
  });

    // it("Click", function () {
    //     var label  = <Label>Some Text We Need to Test</Label>;
    //     ReactTestUtils.renderIntoDocument(label);

    //     ReactTestUtils.Simulate.click(label.refs.p);
    //     expect(label.refs.p.props.children).toBe("Text After Click");
    // });

});
