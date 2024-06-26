export class Datafeed {
  private readonly BASE_URL = `https://www.dota2.com/datafeed`;

  private readonly datastore = new Map<string, any>();

  public async patches(): Promise<any> {
    return this.getData('patchnoteslist?language=english');
  }

  public async heroes(): Promise<any> {
    return this.getData('herolist?language=english');
  }

  public async items(): Promise<any> {
    return this.getData('itemlist?language=english');
  }

  public async abilities(): Promise<any> {
    return this.getData('abilitylist?language=english');
  }

  private async getData(resource: string): Promise<any> {
    if (this.datastore.has(resource)) {
      return this.datastore.get(resource);
    }
    this.datastore.set(resource, await this.makeFetchHappen(resource));
    return this.datastore.get(resource);
  }

  private async makeFetchHappen(resource: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${resource}`);
    return await response.json();
  }
}
