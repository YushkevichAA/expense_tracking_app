import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  CalendarTodayOutlined,
  InfoOutlined,
  TrendingUpRounded,
  CloseRounded,
} from "@mui/icons-material";
import { formatMoney } from "../shared";

const initialTransactions = [
  {
    id: 1,
    date: "12 ноя",
    type: "expense",
    category: "Питание",
    comment: "Кофе и перекус",
    amount: 320,
  },
  {
    id: 2,
    date: "10 ноя",
    type: "income",
    category: "Стипендия",
    comment: "За ноябрь",
    amount: 18000,
  },
  {
    id: 3,
    date: "08 ноя",
    type: "expense",
    category: "Транспорт",
    comment: "Проездной",
    amount: 2450,
  },
  {
    id: 4,
    date: "05 ноя",
    type: "expense",
    category: "Учёба",
    comment: "Учебники",
    amount: 1280,
  },
];

const chartData = [
  { day: "1", income: 60, expense: 44 },
  { day: "7", income: 76, expense: 58 },
  { day: "14", income: 91, expense: 44 },
  { day: "21", income: 60, expense: 58 },
  { day: "28", income: 76, expense: 44 },
  { day: "30", income: 91, expense: 58 },
];

function SummaryCard({
  title,
  value,
  subtitle,
  color,
  children,
}: {
  title: string;
  value: string;
  subtitle?: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: 94,
        bgcolor: "background.paper",
        borderLeft: `4px solid ${color}`,
        borderRadius: 1,
        p: 1.75,
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
        {title}
      </Typography>

      <Typography sx={{ fontSize: 21, fontWeight: 700, mt: 0.4 }}>
        {value}
      </Typography>

      {subtitle && (
        <Typography sx={{ color: "text.secondary", fontSize: 9, mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Box>
  );
}

export function OverviewPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [summary, setSummary] = useState({
    income: 68500,
    expenses: 25820,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savedMessage, setSavedMessage] = useState(true);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    comment: "",
  });

  const balance = summary.income - summary.expenses;

  const addTransaction = () => {
    const amount = Number(form.amount);

    if (!amount || amount <= 0 || !form.category) return;

    const transaction = {
      id: Date.now(),
      date: "Сегодня",
      type: form.type,
      category: form.category,
      comment: form.comment || "Без комментария",
      amount,
    };

    setTransactions((current) => [transaction, ...current].slice(0, 4));

    setSummary((current) => ({
      income: form.type === "income" ? current.income + amount : current.income,
      expenses:
        form.type === "expense" ? current.expenses + amount : current.expenses,
    }));

    setSavedMessage(true);
    setForm({ type: "expense", amount: "", category: "", comment: "" });
    setDialogOpen(false);
  };

  const categories =
    form.type === "income"
      ? ["Стипендия", "Подработка", "Подарок", "Другое"]
      : ["Питание", "Транспорт", "Учёба", "Жильё", "Другое"];

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box component="main" sx={{ flexGrow: 1, minWidth: 0 }}>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
                mb: 3,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                  Добрый день, Анна
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
                  Контролируйте бюджет спокойно и без лишних сложностей
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => setDialogOpen(true)}
                sx={{ fontSize: 11 }}
              >
                Добавить операцию
              </Button>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  xl: "repeat(4, 1fr)",
                },
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <SummaryCard
                title="Текущий баланс"
                value={formatMoney(balance)}
                subtitle="Доступно после расходов"
                color="#1976d2"
              />

              <SummaryCard
                title="Доходы за месяц"
                value={`+${formatMoney(summary.income)}`}
                subtitle="за ноябрь"
                color="#2e7d32"
              />

              <SummaryCard
                title="Расходы за месяц"
                value={`−${formatMoney(summary.expenses)}`}
                subtitle="на 12% меньше прошлого месяца"
                color="#d32f2f"
              />

              <SummaryCard
                title="Ближайший платёж"
                value={formatMoney(24000)}
                color="#ffffff"
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 0.5,
                  }}
                >
                  <Typography sx={{ color: "warning.main", fontSize: 9 }}>
                    до 25 ноября
                  </Typography>
                  <Chip
                    label="Запланирован"
                    size="small"
                    sx={{
                      height: 20,
                      bgcolor: "#fff3e0",
                      color: "#e66a00",
                      fontSize: 9,
                    }}
                  />
                </Stack>
              </SummaryCard>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1.7fr 1fr" },
                gap: 2,
                alignItems: "start",
              }}
            >
              <Box
                sx={{
                  p: 2.25,
                  bgcolor: "background.paper",
                  borderRadius: 1.5,
                  minHeight: 205,
                }}
              >
                <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>
                  Динамика за месяц
                </Typography>

                <Stack direction="row" sx={{ spacing: 1, mb: 1.75 }}>
                  <Chip
                    label="Доходы"
                    size="small"
                    sx={{
                      bgcolor: "#e8f5e9",
                      color: "#267a35",
                      fontSize: 9,
                      height: 21,
                    }}
                  />
                  <Chip
                    label="Расходы"
                    size="small"
                    sx={{
                      bgcolor: "#ffebee",
                      color: "#c62828",
                      fontSize: 9,
                      height: 21,
                    }}
                  />
                </Stack>

                <Divider />

                <Box
                  sx={{
                    height: 122,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-around",
                    pt: 1,
                  }}
                >
                  {chartData.map((item) => (
                    <Box
                      key={item.day}
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 0.5,
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "flex-end",
                          spacing: 0.5,
                        }}
                      >
                        <Box
                          sx={{
                            width: 17,
                            height: `${item.income}%`,
                            bgcolor: "#2e7d32",
                            borderRadius: "2px 2px 0 0",
                          }}
                        />
                        <Box
                          sx={{
                            width: 17,
                            height: `${item.expense}%`,
                            bgcolor: "#cf2929",
                            borderRadius: "2px 2px 0 0",
                          }}
                        />
                      </Stack>
                      <Typography sx={{ color: "text.secondary", fontSize: 8 }}>
                        {item.day}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  p: 2,
                  bgcolor: "background.paper",
                  borderRadius: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                    Последние операции
                  </Typography>
                  <Button size="small" sx={{ fontSize: 9 }}>
                    Все операции
                  </Button>
                </Stack>

                <Stack divider={<Divider flexItem />}>
                  {transactions.map((transaction) => {
                    const isIncome = transaction.type === "income";

                    return (
                      <Box
                        key={transaction.id}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "16px 42px 0.9fr 1fr auto",
                          alignItems: "center",
                          gap: 0.75,
                          py: 1.1,
                        }}
                      >
                        {isIncome ? (
                          <TrendingUpRounded
                            sx={{ fontSize: 13, color: "success.main" }}
                          />
                        ) : (
                          <CalendarTodayOutlined
                            sx={{ fontSize: 12, color: "error.main" }}
                          />
                        )}

                        <Typography
                          sx={{ color: "text.secondary", fontSize: 8 }}
                        >
                          {transaction.date}
                        </Typography>

                        <Typography sx={{ fontSize: 9, fontWeight: 600 }}>
                          {transaction.category}
                        </Typography>

                        <Typography
                          sx={{
                            color: "text.secondary",
                            fontSize: 8,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {transaction.comment}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: isIncome ? "success.main" : "error.main",
                          }}
                        >
                          {isIncome ? "+" : "−"}
                          {formatMoney(transaction.amount)}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>

                {savedMessage && (
                  <Alert
                    severity="success"
                    icon={false}
                    action={
                      <IconButton
                        size="small"
                        onClick={() => setSavedMessage(false)}
                        aria-label="Закрыть уведомление"
                      >
                        <CloseRounded sx={{ fontSize: 14 }} />
                      </IconButton>
                    }
                    sx={{ mt: 1.5, py: 0, fontSize: 10 }}
                  >
                    Операция сохранена
                  </Alert>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                mt: 2,
                color: "text.secondary",
              }}
            >
              <InfoOutlined sx={{ fontSize: 13 }} />
              <Typography sx={{ fontSize: 9 }}>
                Баланс рассчитывается по добавленным доходам и расходам.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Добавить операцию</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Тип операции</InputLabel>
              <Select
                label="Тип операции"
                value={form.type}
                onChange={(event) =>
                  setForm({
                    ...form,
                    type: event.target.value,
                    category: "",
                  })
                }
              >
                <MenuItem value="expense">Расход</MenuItem>
                <MenuItem value="income">Доход</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Сумма, ₽"
              type="number"
              value={form.amount}
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

            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                label="Категория"
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Комментарий"
              value={form.comment}
              onChange={(event) =>
                setForm({ ...form, comment: event.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={addTransaction}>
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
