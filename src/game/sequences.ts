export type SequenceItem = string | number;

function choiceExcluding<T>(arr: T[], exclude: Set<T>): T {
  const pool = arr.filter((x) => !exclude.has(x));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function generateSequence(
  n: number,
  length: number,
  mode: 'letters' | 'shapes',
  targetMatchRate = 0.3
): SequenceItem[] {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const shapes = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟠', '⚫', '⚪'];
  const items = mode === 'letters' ? letters : shapes;

  if (items.length < 2) throw new Error('Items set must have at least 2 symbols');
  if (n <= 0) throw new Error('n must be >= 1');
  if (length <= n) throw new Error('length must be > n');

  const seq: SequenceItem[] = new Array(length);

  // Preselect target indices to control the match rate (only indices >= n are eligible)
  const eligible = Array.from({ length: length - n }, (_, i) => i + n);
  const targetsCount = Math.max(0, Math.min(eligible.length, Math.round(eligible.length * targetMatchRate)));
  const targetSet = new Set<number>();
  while (targetSet.size < targetsCount) {
    const idx = eligible[Math.floor(Math.random() * eligible.length)];
    targetSet.add(idx);
  }

  for (let i = 0; i < length; i++) {
    if (i < n) {
      // Prime with random items (avoid immediate duplicates for nicer UX)
      const exclude = new Set<SequenceItem>();
      if (i > 0) exclude.add(seq[i - 1]);
      seq[i] = choiceExcluding(items, exclude);
      continue;
    }

    if (targetSet.has(i)) {
      // Force an n-back match
      seq[i] = seq[i - n];
    } else {
      // Avoid accidental targets by excluding the n-back symbol
      const exclude = new Set<SequenceItem>([seq[i - n]]);
      // Optional: avoid immediate duplicates for readability
      if (i > 0) exclude.add(seq[i - 1]);
      seq[i] = choiceExcluding(items, exclude);
    }
  }

  return seq;
}

export function getNBackItems(sequence: SequenceItem[], n: number): SequenceItem[] {
  return sequence.slice(n);
}