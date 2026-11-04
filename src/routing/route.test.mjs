// Self-check for the hash pattern: node src/routing/route.test.mjs
import assert from 'node:assert/strict';
const CASE = /^#\/case\/([a-z0-9-]+)$/;
const pick = (h) => CASE.exec(h)?.[1] ?? null;
assert.equal(pick('#/case/fleet'), 'fleet');
assert.equal(pick('#/case/fleet-mcp'), 'fleet-mcp');
assert.equal(pick('#work'), null);
assert.equal(pick(''), null);
assert.equal(pick('#/case/'), null);
assert.equal(pick('#/case/Fleet<x>'), null);
console.log('route ok');
