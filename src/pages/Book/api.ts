import { request } from '../../utils/request';
import { CreateBook, UpdateBook } from './interface';

export const list = (name: string): Promise<any> => {
    return request.get('/book/list', {
        params: {
            name
        }
    });
}

export const create = (data: CreateBook): Promise<any> => {
    return request.post('/book/create', data);
};

export const update = (data: UpdateBook): Promise<any> => {
    return request.put('/book/update', data);
};

export const detail = (id: number): Promise<any> => {
    return request.get(`/book/${id}`);
};

export const del = (id: number): Promise<any> => {
    return request.delete(`/book/delete/${id}`);
};

