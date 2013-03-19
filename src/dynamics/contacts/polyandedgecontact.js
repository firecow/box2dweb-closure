/*
 * copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
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

goog.provide('box2d.dynamics.contacts.PolyAndEdgeContact');

goog.require('box2d.collision.Collision');
goog.require('box2d.collision.shapes.EdgeShape');
goog.require('box2d.collision.shapes.PolygonShape');
goog.require('box2d.common.Settings');
goog.require('box2d.dynamics.contacts.Contact');

/**
 * @param {!box2d.dynamics.Fixture} fixtureA
 * @param {!box2d.dynamics.Fixture} fixtureB
 * @constructor
 * @extends {box2d.dynamics.contacts.Contact}
 */
box2d.dynamics.contacts.PolyAndEdgeContact = function(fixtureA, fixtureB) {
    box2d.common.Settings.assert(fixtureA.getShape() instanceof box2d.collision.shapes.PolygonShape);
    box2d.common.Settings.assert(fixtureB.getShape() instanceof box2d.collision.shapes.EdgeShape);
    goog.base(this, fixtureA, fixtureB);
};
goog.inherits(box2d.dynamics.contacts.PolyAndEdgeContact, box2d.dynamics.contacts.Contact);

/**
 * @param {!box2d.dynamics.Fixture} fixtureA
 * @param {!box2d.dynamics.Fixture} fixtureB
 */
box2d.dynamics.contacts.PolyAndEdgeContact.prototype.reset = function(fixtureA, fixtureB) {
    box2d.common.Settings.assert(fixtureA.getShape() instanceof box2d.collision.shapes.PolygonShape);
    box2d.common.Settings.assert(fixtureB.getShape() instanceof box2d.collision.shapes.EdgeShape);
    goog.base(this, 'reset', fixtureA, fixtureB);
};

box2d.dynamics.contacts.PolyAndEdgeContact.prototype.evaluate = function() {
    this.collidePolyAndEdge(this.m_manifold, this.m_fixtureA.getShape(), this.m_fixtureA.getBody().m_xf, this.m_fixtureB.getShape(), this.m_fixtureB.getBody().m_xf);
};

box2d.dynamics.contacts.PolyAndEdgeContact.prototype.collidePolyAndEdge = function(manifold, polygon, xf1, edge, xf2) {
};
