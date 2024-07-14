import { transformPatchResponseToChanges } from './patch-response-to-patch-changeset';

describe(`transformPatchResponseToPatchChangeset`, () => {
  it(`should transform date correctly`, () => {
    expect(
      transformPatchResponseToChanges({
        patch_number: `7.01`,
        patch_timestamp: 1719817841,
      })
    ).toEqual({
      version: '7.01',
      timestamp: new Date(`2024-07-01T07:10:41+00:00`),
      heroChanges: [],
      itemChanges: [],
      generalChanges: [],
    });
  });
});
