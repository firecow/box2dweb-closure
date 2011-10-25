/*
 * Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */
/*
 * Original Box2D created by Erin Catto
 * http://www.gphysics.com
 * http://box2d.org/
 * 
 * Box2D was converted to Flash by Boris the Brave, Matt Bush, and John Nesky as Box2DFlash
 * http://www.box2dflash.org/
 * 
 * Box2DFlash was converted from Flash to Javascript by Uli Hecht as box2Dweb
 * http://code.google.com/p/box2dweb/
 * 
 * box2Dweb was modified to utilize Google Closure, as well as other bug fixes, optimizations, and tweaks by Illandril
 * https://github.com/illandril/box2dweb-closure
 */
 
goog.provide('Box2D.Dynamics.b2FixtureList');

goog.require('Box2D.Dynamics.b2FixtureListNode');

goog.require('goog.array');

/**
 * @constructor
 */
Box2D.Dynamics.b2FixtureList = function() {
    
    /**
     * @private
     * @type {Box2D.Dynamics.b2FixtureListNode}
     */
    this.fixtureFirstNode = null;
    
    /**
     * @private
     * @type {Box2D.Dynamics.b2FixtureListNode}
     */
    this.fixtureLastNode = null;
    
    /**
     * @private
     * @type {Object.<Array.<Box2D.Dynamics.b2FixtureListNode>>}
     */
    this.fixtureNodeLookup = {};
    
    /**
     * @private
     * @type {number}
     */
    this.fixtureCount = 0;
};

/**
 * @param {number} type
 * @return {Box2D.Dynamics.b2FixtureListNode}
 */
Box2D.Dynamics.b2FixtureList.prototype.GetFirstNode = function() {
    return this.fixtureFirstNode;
};

/**
 * @param {!Box2D.Dynamics.b2Fixture} fixture
 */
Box2D.Dynamics.b2FixtureList.prototype.AddFixture = function(fixture) {
    var fixtureID = fixture.ID;
    if (this.fixtureNodeLookup[fixtureID] == null) {
        var node = this.fixtureNodeLookup[fixtureID];
        if (node == null) {
            node = new Box2D.Dynamics.b2FixtureListNode(fixture);
            var prevNode = this.fixtureLastNode;
            if (prevNode != null) {
                prevNode.SetNextNode(node);
            } else {
                this.fixtureFirstNode = node;
            }
            node.SetPreviousNode(prevNode);
            this.fixtureLastNode = node;
            this.fixtureCount++;
        }
    }
};

/**
 * @param {!Box2D.Dynamics.b2Fixture} fixture
 */
Box2D.Dynamics.b2FixtureList.prototype.RemoveFixture = function(fixture) {
    var fixtureID = fixture.ID;
    var node = this.fixtureNodeLookup[fixtureID];
    if (node == null) {
        return;
    }
    var prevNode = node.GetPreviousNode();
    var nextNode = node.GetNextNode();
    if (prevNode == null) {
        this.fixtureFirstNode = nextNode;
    } else {
        prevNode.SetNextNode(nextNode);
    }
    if (nextNode == null) {
        this.fixtureLastNode = prevNode;
    } else {
        nextNode.SetPreviousNode(prevNode);
    }
    delete this.fixtureNodeLookup[fixtureID];
    this.fixtureCount--;
};

/**
 * @return {number}
 */
Box2D.Dynamics.b2FixtureList.prototype.GetFixtureCount = function() {
    return this.fixtureCount;
};
