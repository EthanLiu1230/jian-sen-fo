import app from '../../src/app';

describe("'contents' service", () => {
  it('registered the service', () => {
    const service = app.service('contents');
    expect(service).toBeTruthy();
  });
});
