import service from './server'

// query all page

export class ModelApi {


    public all<T = any>() {
        return service.get<T>('/model/all');
    }
    public queryList<T = any>(data: any) {
        return service.get<T>('/model/list', data);
    }

    public queryByName<T = any>(data: any) {
        return service.get<T>('/model/qname', data)
    }

    public add<T = any>(data: any) {
        return service.post<T>('/model/add', data)
    }

    public update<T = any>(data: any) {
        return service.post<T>('/model/update', data)
    }
}

export default new ModelApi();







