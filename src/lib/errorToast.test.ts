import { describe, expect, it } from 'vitest';
import { errorToast } from './errorToast';

describe('errorToast', () => {
  it('names the failed action and shows the error message', () => {
    expect(errorToast("Couldn't save the post", new Error('Title is too long.'))).toMatchObject({
      title: "Couldn't save the post",
      description: 'Title is too long.',
    });
  });

  it('asks to try again when there is no error message', () => {
    expect(errorToast("Couldn't save your vote").description).toBe('Please try again.');
    expect(errorToast("Couldn't save your vote", 'oops').description).toBe('Please try again.');
  });

  it('stays until dismissed', () => {
    expect(errorToast("Couldn't save your vote").duration).toBe(Infinity);
  });
});
