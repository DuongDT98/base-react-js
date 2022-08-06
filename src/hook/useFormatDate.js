import moment from "moment";

export function formatDateUS(date) {
  if (date) {
    return moment.utc(date).local().format("DD/MM/YYYY, hh:mm A");
  }
  return "";
}

export function formatDate(date) {
  if (date) {
    return moment.utc(date).format("DD-MM-YYYY");
  }
  return "";
}

export function convertToArray(data) {
  return Array.isArray(data) ? data : [];
}

export function formatDateTimePST(date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format("DD/MM/YYYY, HH:mm:ss");
  }
  return "";
}

export function formatDateTimeAM_PM_PST(date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format("DD/MM/YYYY, hh:mm A");
  }
  return "";
}

export function formatDateTimeCustomAddZPST(date, type) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(`${date}Z`);

    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format(type);
  }
  return "";
}

export function formatDateTimeCustomPST(date, type) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);

    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format(type);
  }
  return "";
}

export function formatDateTimeUTCCustom(date, type) {
  return moment.utc(new Date(date)).format(type);
}

export function formatDateTimeNotSecPST(date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format("DD/MM/YYYY, HH:mm");
  }
  return "";
}

export function formatDateTimeLLPST(date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format("LL");
  }
  return "";
}

export const formatDateOnlyPST = (date) => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone,
      })
    ).format("DD/MM/YYYY");
  }
  return "";
};

export function formatDateWithTimeHHMM(date) {
  if (date) {
    const myDate = new Date(date);
    return moment(
      myDate.toLocaleString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    ).format("DD/MM/YYYY, HH:mm");
  }
  return "";
}

export function formatDateWithTime(date) {
  if (date) {
    return moment.utc(date).format("DD/MM/YYYY, hh:mm A");
  }
  return "";
}

export function formatTime(time, notUtc) {
  if (!time) {
    return "";
  }

  if (time) {
    return moment.utc(time).format("HH:mm");
  }
}

export function formatDateNotTimeUtc(date) {
  return moment.utc(date).format("DD/MM/YYYY");
}

export function formatDateNotTime(date) {
  return moment.utc(date).local().format("DD/MM/YYYY");
}

export function formatDateFromNow(date) {
  return moment.utc(date).local().fromNow();
}

export function formatDateFromNowPST(date) {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return moment(
    new Date(date).toLocaleString("en-US", {
      timeZone,
    })
  )
    .local()
    .fromNow();
}

export function fromatDateMonthYear(date) {
  return moment(date).format("MMM, YYYY");
}

export function formatDateByLocalTime(date) {
  return moment.utc(date).format("L");
}
