import * as yup from 'yup';

export const getAppointmentSchema = yup.object().shape({
    status: yup.string().oneOf(['PENDING', 'CANCELLED', "COMPLETED", "APPROVED", "REJECTED"]),
    page: yup.string()
});

