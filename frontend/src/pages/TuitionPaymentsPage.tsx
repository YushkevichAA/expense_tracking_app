import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

  // MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { AddRounded, InfoOutlined } from "@mui/icons-material";
import { formatDateFromString, formatMoney } from "../shared";
import { usePayments, usePaymentsActions } from "../store";
import type { IPayment } from "../shared/types";
import {
  deletePaymentService,
  patchPaymentService,
  setPaymentService,
} from "../services/server.service";

const statusConfig = {
  planned: {
    label: "Запланирован",
    color: "#e66a00",
    background: "#fff3e0",
  },
  paid: {
    label: "Оплачен",
    color: "#267a35",
    background: "#e8f5e9",
  },
  overdue: {
    label: "Просрочен",
    color: "#c62828",
    background: "#ffebee",
  },
};

export function TuitionPaymentsPage() {
  const payments = usePayments();
  const { updatePayment, addPayment, deletePayment } = usePaymentsActions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<IPayment | null>(null);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    dueDate: "",
  });

  const total = useMemo(
    () => payments.reduce((sum, payment) => sum + Number(payment.amount), 0),
    [payments],
  );

  const paidCount = payments.filter(
    (payment) => payment.status === "paid",
  ).length;

  const openAddDialog = () => {
    setEditingPayment(null);
    setForm({ title: "", amount: "", dueDate: "" });
    setDialogOpen(true);
  };

  const openEditDialog = (payment: IPayment) => {
    setEditingPayment(payment);
    setForm({
      title: payment.title,
      amount: String(payment.amount),
      dueDate: payment.dueDate,
    });
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const savePayment = async () => {
    if (!form.title.trim() || !form.amount || !form.dueDate) return;

    if (editingPayment) {
      const response = await patchPaymentService(editingPayment);

      updatePayment(response.data);
    } else {
      const response = await setPaymentService({
        title: form.title.trim(),
        amount: Number(form.amount),
        dueDate: form.dueDate,
        status: "planned",
      });
      addPayment(response.data);
    }

    closeDialog();
  };

  const markAsPaid = (payment: IPayment) => {
    // добавить сюда апи на изменение данных на бэкенде
    updatePayment(payment);
  };

  const handleDelete = async (id: string) => {
    const response = await deletePaymentService(id);

    if (response.status > 300) {
      return;
    }
    deletePayment(id);
  };

  return (
    <>
      <Box sx={{ px: { xs: 2, md: 3.5 }, py: 2.5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          sx={{
            alignItems: { xs: "stretch", sm: "flex-start" },
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ variant: "h5", fontWeight: 700, fontSize: 20 }}>
              Платежи за обучение
            </Typography>
            <Typography
              sx={{ color: "text.secondary", fontSize: 12, mb: 0.25 }}
            >
              Планируйте сроки и отмечайте оплату вручную
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={openAddDialog}
            sx={{ alignSelf: { xs: "flex-start", sm: "auto" } }}
          >
            Добавить платёж
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            mt: 4.5,
            mb: 6,
            alignItems: { xs: "flex-start", md: "center" },
            spacing: { xs: 1.5, md: 7 },
          }}
        >
          <Box>
            <Typography sx={{ color: "text.secondary", fontSize: 11 }}>
              Запланировано на учебный год
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 12, mb: 0.25 }}>
              {formatMoney(total)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "text.secondary", fontSize: 11 }}>
              платежи: {payments.length} · оплачено: {paidCount}
            </Typography>
          </Box>
          <Chip
            label="Учебный год 2026/27"
            size="small"
            sx={{
              ml: { md: "auto !important" },
              justifyContent: "flex-start",
              bgcolor: "#e8f1fc",
              color: "primary.main",
              fontSize: 10,
            }}
          />
        </Stack>

        <Typography sx={{ fontWeight: 700, fontSize: 12, mb: 1.5 }}>
          Запланированные платежи
        </Typography>

        <Stack spacing={1.25}>
          {payments.map((payment) => {
            const status = statusConfig[payment.status];

            return (
              <Box
                key={payment.id}
                sx={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: { xs: 1.5, md: 2 },
                  minHeight: 48,
                  px: 1.75,
                  py: 1.25,
                  border: "1px solid #dfe5ed",
                  borderRadius: 1.5,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 12 }}>
                  {payment.title}
                </Typography>

                <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                  {formatMoney(payment.amount)}
                </Typography>

                <Typography sx={{ color: "text.secondary", fontSize: 11 }}>
                  {formatDateFromString(payment.dueDate)}
                </Typography>

                <Chip
                  label={status.label}
                  size="small"
                  sx={{
                    width: "fit-content",
                    minWidth: 88,
                    justifyContent: "flex-start",
                    color: status.color,
                    bgcolor: status.background,
                    fontSize: 10,
                    height: 22,
                  }}
                />

                {payment.status === "planned" ? (
                  <Button
                    size="small"
                    onClick={() => markAsPaid({ ...payment, status: "paid" })}
                    sx={{ fontSize: 11, justifySelf: "start" }}
                  >
                    Отметить как оплаченный
                  </Button>
                ) : payment.status === "overdue" ? (
                  <Button
                    size="small"
                    color="inherit"
                    onClick={() => openEditDialog(payment)}
                    sx={{ fontSize: 11, justifySelf: "start" }}
                  >
                    Изменить срок
                  </Button>
                ) : (
                  <Typography
                    sx={{
                      color: "success.main",
                      fontSize: 10,
                      justifySelf: "start",
                    }}
                  >
                    Статус изменён вручную
                  </Typography>
                )}
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => handleDelete(payment.id)}
                  sx={{ fontSize: 11, justifySelf: "start" }}
                >
                  Удалить платеж
                </Button>
              </Box>
            );
          })}
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 8,
            px: 2,
            py: 1.5,
            borderRadius: 1,
            color: "primary.main",
            bgcolor: "#e8f1fc",
          }}
        >
          <InfoOutlined sx={{ fontSize: 15 }} />
          <Typography sx={{ fontSize: 11 }}>
            Приложение не проводит платежи — здесь можно только планировать и
            менять статус записи.
          </Typography>
        </Box>
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>
          {editingPayment ? "Изменить срок платежа" : "Добавить платёж"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Название"
              value={form.title}
              disabled={Boolean(editingPayment)}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              fullWidth
            />

            <TextField
              label="Сумма, ₽"
              type="number"
              value={form.amount}
              disabled={Boolean(editingPayment)}
              onChange={(event) =>
                setForm({ ...form, amount: event.target.value })
              }
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
              fullWidth
            />

            <TextField
              label="Срок оплаты"
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm({ ...form, dueDate: event.target.value })
              }
              slotProps={{
                inputLabel: { shrink: true },
              }}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog}>Отмена</Button>
          <Button variant="contained" onClick={savePayment}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
