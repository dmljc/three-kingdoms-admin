import { request } from '../../utils/request';
import { CreateBook } from './CreateModal';

export const create = (data: CreateBook): Promise<any> => {
    return request.post('/book/create', data);
};
export const update = (data: CreateBook): Promise<any> => {
    return request.put('/book/update', data);
};

export const list = (name:string): Promise<any>=> {
    return request.get('/book/list', {
        params: {
            name
        }
    });
}