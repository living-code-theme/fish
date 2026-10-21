// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';

const flavors = resolveAll();

const fishTheme=f=>generate([f])[0].content;

test("fish themes set the documented color variables as bare hex", () => {
  const required = ["normal", "command", "keyword", "quote", "redirection", "end", "error", "param", "option", "comment", "selection", "operator", "escape", "autosuggestion", "cwd", "cwd_root", "user", "host", "host_remote", "status", "valid_path", "history_current", "search_match", "cancel"].map((n) => `fish_color_${n}`);
  const pager = ["progress", "background", "prefix", "completion", "description", "selected_background", "selected_prefix", "selected_completion", "selected_description", "secondary_background", "secondary_prefix", "secondary_completion", "secondary_description"].map((n) => `fish_pager_color_${n}`);
  for (const f of flavors) {
    const text = fishTheme(f);
    assert.ok(text.startsWith(`# name: '${f.name}'\n`));
    const vars = new Map(text.split("\n").filter((l) => /^fish_/.test(l)).map((l) => [l.split(" ")[0], l.split(" ").slice(1).join(" ")]));
    for (const k of [...required, ...pager]) assert.ok(vars.has(k), k);
    assert.ok(!text.includes("#", text.indexOf("\n\n")), "colors are bare hex");
    assert.equal(vars.get("fish_color_normal"), f.r("fg").slice(1));
    assert.equal(vars.get("fish_color_error"), f.r("error").slice(1));
    assert.match(vars.get("fish_color_selection"), /--background=[0-9a-f]{6}$/);
  }
});
