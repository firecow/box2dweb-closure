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

goog.provide('box2d.collision.Manifold');

goog.require('UsageTracker');
goog.require('box2d.collision.ManifoldPoint');
goog.require('box2d.common.Settings');
goog.require('box2d.common.math.Vec2');

/**
 * @constructor
 */
box2d.collision.Manifold = function() {
    UsageTracker.get('box2d.collision.Manifold').trackCreate();

    /**
     * @type {number}
     */
    this.m_pointCount = 0;

    /**
     * @type {number}
     */
    this.m_type = 0;

    /**
     * @type {Array.<!box2d.collision.ManifoldPoint>}
     */
    this.m_points = [];

    for (var i = 0; i < box2d.common.Settings.maxManifoldPoints; i++) {
        this.m_points[i] = new box2d.collision.ManifoldPoint();
    }

    /**
     * @type {!box2d.common.math.Vec2}
     */
    this.m_localPlaneNormal = box2d.common.math.Vec2.get(0, 0);

    /**
     * @type {!box2d.common.math.Vec2}
     */
    this.m_localPoint = box2d.common.math.Vec2.get(0, 0);
};

box2d.collision.Manifold.prototype.reset = function() {
    for (var i = 0; i < box2d.common.Settings.maxManifoldPoints; i++) {
        this.m_points[i].reset();
    }
    this.m_localPlaneNormal.setZero();
    this.m_localPoint.setZero();
    this.m_type = 0;
    this.m_pointCount = 0;
};

/**
 * @param {!box2d.collision.Manifold} m
 */
box2d.collision.Manifold.prototype.set = function(m) {
    this.m_pointCount = m.m_pointCount;
    for (var i = 0; i < box2d.common.Settings.maxManifoldPoints; i++) {
        this.m_points[i].set(m.m_points[i]);
    }
    this.m_localPlaneNormal.setV(m.m_localPlaneNormal);
    this.m_localPoint.setV(m.m_localPoint);
    this.m_type = m.m_type;
};

/**
 * @return {!box2d.collision.Manifold}
 */
box2d.collision.Manifold.prototype.copy = function() {
    var copy = new box2d.collision.Manifold();
    copy.set(this);
    return copy;
};

/**
 * @const
 * @type {number}
 */
box2d.collision.Manifold.e_circles = 0x0001;

/**
 * @const
 * @type {number}
 */
box2d.collision.Manifold.e_faceA = 0x0002;

/**
 * @const
 * @type {number}
 */
box2d.collision.Manifold.e_faceB = 0x0004;
