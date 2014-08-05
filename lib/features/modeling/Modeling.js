'use strict';

var _ = require('lodash');

var BaseModeling = require('diagram-js/lib/features/modeling/Modeling');

var AppendShapeHandler = require('./cmd/AppendShapeHandler'),
    CreateShapeHandler = require('diagram-js/lib/features/modeling/cmd/CreateShapeHandler'),
    CreateConnectionHandler = require('diagram-js/lib/features/modeling/cmd/CreateConnectionHandler'),
    CreateLabelHandler = require('diagram-js/lib/features/modeling/cmd/CreateLabelHandler'),

    LayoutConnectionHandler = require('diagram-js/lib/features/modeling/cmd/LayoutConnectionHandler'),

    MoveShapeHandler = require('diagram-js/lib/features/modeling/cmd/MoveShapeHandler');


/**
 * BPMN 2.0 modeling features activator
 *
 * @param {EventBus} eventBus
 * @param {CommandStack} commandStack
 */
function Modeling(eventBus, commandStack) {
  BaseModeling.call(this, eventBus, commandStack);
}

Modeling.prototype = Object.create(BaseModeling.prototype);

Modeling.$inject = [ 'eventBus', 'commandStack' ];

module.exports = Modeling;


Modeling.prototype.registerHandlers = function(commandStack) {
  commandStack.registerHandler('shape.create', CreateShapeHandler);
  commandStack.registerHandler('shape.move', MoveShapeHandler);

  commandStack.registerHandler('shape.append', AppendShapeHandler);

  commandStack.registerHandler('label.create', CreateLabelHandler);

  commandStack.registerHandler('connection.create', CreateConnectionHandler);
  commandStack.registerHandler('connection.layout', LayoutConnectionHandler);
};


Modeling.prototype.updateLabel = function(element, newLabel) {
  this._commandStack.execute('element.updateLabel', {
    element: element,
    newLabel: newLabel
  });
};


/**
 * Append a flow node to the element with the given source
 * at the specified position.
 */
Modeling.prototype.appendFlowNode = function(source, type, position) {

  position = position || {
    x: source.x + source.width + 100,
    y: source.y + source.height / 2
  };

  return this.appendShape(source, { type: type }, position, { type: 'bpmn:SequenceFlow'});
};

Modeling.prototype.appendTextAnnotationNode = function(source, type, position) {

  position = position || {
    x: source.x + source.width / 2,
    y: source.y - (source.height / 2) - 100
  };

  return this.appendShape(source, { type: type }, position, { type: 'bpmn:Association'});
};
