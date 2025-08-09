import { useEffect, useState } from "react";
import { Row, Col, ConfigProvider, message } from "antd";
import {
    DollarOutlined,
    ShoppingCartOutlined,
    TeamOutlined,
    ShopOutlined,
    CreditCardOutlined,
    InboxOutlined,
    ClockCircleOutlined,
} from "@ant-design/icons";
import axios from "@/axios-client";
import StatCard from "./stat-card";

const fmtMoney = (n: number) =>
    `$ ${Number(n ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/admin/widgets");
            setData(data);
        } catch {
            message.error("Failed to load widgets");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const k = data?.kpis ?? {};
    const c = data?.counts ?? {};
    const todayOrders = data?.today?.orders ?? 0;

    return (
        <ConfigProvider>
            <div className="p-4">
                <h1 className="text-3xl font-extrabold mb-4">Dashboard</h1>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Total Revenue"
                            value={fmtMoney(k.revenue)}
                            subtitle={`This month: ${fmtMoney(k.revenue_month ?? 0)}`}
                            color="emerald"
                            icon={<DollarOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Total Orders"
                            value={k.orders ?? 0}
                            subtitle={`Today: ${todayOrders}`}
                            color="orange"
                            icon={<ShoppingCartOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Total Customers"
                            value={c.customers_total ?? 0}
                            subtitle={`This month: ${c.customers_month ?? 0}`}
                            color="blue"
                            icon={<TeamOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Total Stores"
                            value={c.stores_total ?? 0}
                            subtitle={`Active: ${c.stores_active ?? 0}`}
                            color="green"
                            icon={<ShopOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Paid Orders"
                            value={k.paid_orders ?? 0}
                            subtitle={`Unpaid: ${k.unpaid_orders ?? 0}`}
                            color="green"
                            icon={<CreditCardOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Products"
                            value={c.products_total ?? 0}
                            subtitle={`Active: ${c.products_active ?? 0}`}
                            color="blue"
                            icon={<InboxOutlined />}
                        />
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <StatCard
                            loading={loading}
                            title="Pending Orders"
                            value={k.pending_orders ?? 0}
                            subtitle={`Processing: ${k.processing_orders ?? 0}`}
                            color="orange"
                            icon={<ClockCircleOutlined />}
                        />
                    </Col>
                </Row>
            </div>
        </ConfigProvider>
    );
}
