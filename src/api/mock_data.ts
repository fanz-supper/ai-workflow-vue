import service from './server'


export class MockDataApi {

    public queryList<T = any>(data: any) {
        return service.get<T>('/mock/data/list', data);
    }

    public queryByName<T = any>(data: any) {
        return service.get<T>('/mock/data/qname', data)
    }

    public add<T = any>(data: any) {
        return service.post<T>('/mock/data/add', data)
    }

    public update<T = any>(data: any) {
        return service.post<T>('/mock/data/update', data)
    }

    public run<T = any>(data: any) {
        return service.post<T>('/mock/data/run', data)
    }
}

export default new MockDataApi();







