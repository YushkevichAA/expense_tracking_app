import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  CalendarTodayOutlined,
  InfoOutlined,
  TrendingUpRounded,
  CloseRounded,
} from "@mui/icons-material";
import { formatMoney } from "../shared";
import { SummaryCard } from "../shared/components/SummaryCard";
import { useOperations, useUser } from "../store";

const chartData = [
  { day: "1", income: 60, expense: 44 },
  { day: "7", income: 76, expense: 58 },
  { day: "14", income: 91, expense: 44 },
  { day: "21", income: 60, expense: 58 },
  { day: "28", income: 76, expense: 44 },
  { day: "30", income: 91, expense: 58 },
];

export function OverviewPage() {
  const currentUser = useUser();
  const operations = useOperations();
  const [period, setPeriod] = useState("2026-11"); // добавить текущий месяц
  const [summary, setSummary] = useState({
    income: 68500,
    expenses: 25820,
  });

  // const summary = useMemo(
  //   () =>
  //     сщтые operations.filter((operation) => {

  //     }),
  //   [operations, period],
  // );

  const [savedMessage, setSavedMessage] = useState(true);

  const balance = summary.income - summary.expenses;

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
                  Добрый день, {currentUser?.username || "пользователь"}
                </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
                  Контролируйте бюджет спокойно и без лишних сложностей
                </Typography>
              </Box>
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
                  {operations.map((transaction) => {
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
    </>
  );
}
