import { Button, Form, Input, Select } from "antd";
import { DatePicker } from "antd-jalali";
import { useForm } from "antd/lib/form/Form";
import Logo from "../../Components/Logo/Logo";


const NewKid = () => {
    const [form] = useForm();
    return <div className="form">
        <Logo />
        <h2>فرم ثبت نام غرفه نوباوگان مصباح الهدی</h2>
        <Form
            dir="rtl"
            layout="vertical"
            form={form}
            style={{width : '100%'}}>
            <Form.Item
                label="نام کودک"
                name="first_name"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="نام خانوادگی کودک"
                name="last_name"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}>
                <Input />
            </Form.Item>
            <Form.Item
                label="تاريخ تولد کودک"
                name="date_of_birth"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
                label="جنسیت کودک"
                name="gender"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Select placeholder="انتخاب کنید">
                    <Select.Option value="FE"> دختر</Select.Option>
                    <Select.Option value="MA">پسر</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="نام شما"
                name="caretaker_name"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="نسبت شما با کودک "
                name="caretaker"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="شماره تماس شما"
                name="caretaker_phone_number"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="شماره تماس اضطراری"
                name="emergancy_calls"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="آیا کودک شما به تنهایی به دستشویی می رود؟"
                name="wc"
                rules={[
                    {
                        required: true,
                        message: 'پر کردن این فیلد اجباری است.',
                    },
                ]}
            >
                <Select placeholder="انتخاب کنید">
                    <Select.Option value={true}> بله</Select.Option>
                    <Select.Option value={false}>خیر</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => {
                    console.log(
                        form.getFieldsValue()
                    )
                }} style={{ width: '100%' }} type="primary">ثبت نام</Button>
            </Form.Item>
        </Form>
    </div>

}

export default NewKid;