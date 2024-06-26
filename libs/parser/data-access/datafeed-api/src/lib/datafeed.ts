export class Datafeed {
  private static readonly BASE_URL = `https://www.dota2.com/datafeed`;

  private static readonly datastore = new Map<string, any>();

  public static async patches(): Promise<any[]> {
    return this.getData('patchnoteslist?language=english');
  }

  public static async heroes(): Promise<any> {
    return this.getData('herolist?language=english');
  }

  public static async items(): Promise<any> {
    return this.getData('itemlist?language=english');
  }

  public static async abilities(): Promise<any> {
    return this.getData('abilitylist?language=english');
  }

  public static async patch(version: string): Promise<any> {
    return this.getData(`patchnotes?version=${version}&language=english`);
  }

  private static async getData(resource: string): Promise<any> {
    if (this.datastore.has(resource)) {
      return this.datastore.get(resource);
    }
    this.datastore.set(resource, await this.makeFetchHappen(resource));
    return this.datastore.get(resource);
  }

  private static async makeFetchHappen(resource: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/${resource}`);
    return await response.json();
  }
}
