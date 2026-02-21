import * as yup from 'yup';

export const statusSchema = yup.object().shape({
    status: yup.string().oneOf(['PENDING', 'CANCELLED', "COMPLETED", "APPROVED", "REJECTED"]).required('Status is required'),
});
