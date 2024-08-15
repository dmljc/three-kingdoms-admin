// import { axiosInstance } from '../../utils/request';

// export const register = async (username: string, password: string, password2: string) => {
//     return await axiosInstance.post('/api/user/register', {
//         username, password, password2
//     });
// }

import { request } from '../../utils/request';

export const register = (data: any): Promise<any> => {
    return request.post('/user/register', data);
};
