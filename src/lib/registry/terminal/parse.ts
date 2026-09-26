export type TerminalLine =
	| { kind: 'command'; text: string }
	| { kind: 'comment'; text: string }
	| { kind: 'ok'; text: string }
	| { kind: 'output'; text: string };

/**
 * Split a session into lines. `$ cmd` is a command, `# …` a comment, a
 * leading `✓` a pass, anything else output. Leading and trailing blank lines
 * are dropped; inner whitespace is kept.
 */
export function parseTerminal(source: string, prompt: string): TerminalLine[] {
	const lines = source.replace(/\r\n?/g, '\n').split('\n');

	while (lines.length > 0 && lines[0]?.trim() === '') {
		lines.shift();
	}

	while (lines.length > 0 && lines[lines.length - 1]?.trim() === '') {
		lines.pop();
	}

	return lines.map((raw) => {
		const text = raw.replace(/\s+$/, '');

		if (text.startsWith(`${prompt} `) || text === prompt) {
			return { kind: 'command', text: text.slice(prompt.length).trimStart() };
		}

		if (text.startsWith('#')) {
			return { kind: 'comment', text };
		}

		if (/^[✓✔√]/.test(text)) {
			return { kind: 'ok', text };
		}

		return { kind: 'output', text };
	});
}
