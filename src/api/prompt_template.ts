import service from './server.js'

export class PromptTemplateApi {

    public all<T = any>() {
        return service.get<T>('/promptTemplate/all');
    }

    public queryList<T = any>(data: any) {
        return service.get<T>('/promptTemplate/list', data);
    }

    public queryByName<T = any>(data: any) {
        return service.get<T>('/promptTemplate/qname', data)
    }

    public add<T = any>(data: any) {
        return service.post<T>('/promptTemplate/add', data)
    }

    public update<T = any>(data: any) {
        return service.post<T>('/promptTemplate/update', data)
    }
}

export default new PromptTemplateApi();





