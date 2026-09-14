import logging

logging.basicConfig(
    level= logging.INFO,
    format= "| %(asctime)s| %(levelname)s | %(massage)s | %(linero)d",
    handlers=[logging.FileHandler("system.log", encoding="utf-8"),
              logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

logger.info("testing logger")