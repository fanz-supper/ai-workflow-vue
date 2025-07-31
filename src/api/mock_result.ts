import service from './server'


export class MockResultApi {

    public queryList<T = any>(result: any) {
        return service.get<T>('/mock/result/list', result);
    }

    public add<T = any>(result: any) {
        return service.post<T>('/mock/result/add', result)
    }

    public update<T = any>(result: any) {
        return service.post<T>('/mock/result/update', result)
    }
}

export default new MockResultApi();







