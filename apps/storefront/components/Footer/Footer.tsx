import clsx from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { getLinkPath } from "@/lib/menus";
import { usePaths } from "@/lib/paths";
import { useFooterMenuQuery } from "@/saleor/api";

import { Box } from "../Box";
import { useRegions } from "../RegionsProvider";
import styles from "./Footer.module.css";

export type FooterProps = HTMLAttributes<HTMLElement>;

// Saleor Cloud currently doesn't support relative URLs in the footer.
// This is a workaround to make the links work.
// @todo remove this when the issue is fixed.
const fixMenuItemLocalhostUrl = (url: string) => url.replace(/^https?:\/\/localhost:8000\//, "/");

export function Footer({ className, ...rest }: FooterProps) {
  const paths = usePaths();
  const { query, currentChannel, currentLocale } = useRegions();

  const { data, error } = useFooterMenuQuery({ variables: { ...query } });

  if (error) {
    console.error("Footer component error", error.message);
  }

  const menu = data?.menu?.items || [];
  // console.log("menu:: ", menu);
  return (
    <>
      <hr className={styles["footer-hr"]} />
      <footer className={clsx(styles.footer, className)} {...rest}>
        <Box className={styles["footer-inner"]}>
          <div className="flex mb-14 sm:mb-0">
            <div className="md:border-r-[0.5px] md:border-[#A5A5A5] md:pr-[100px]">
              <Link href={paths.$url()} passHref legacyBehavior>
                <a href="pass" className="hidden sm:inline-block">
                  <div className="mt-px group block h-[79px] w-[191px] relative">
                    <Image src="/saleor.svg" alt="Le Story logo" layout="fill" />
                  </div>
                </a>
              </Link>
              <h5 className="text-[15px] font-bold leading-[17px] mt-4">
                Tan Brothers Auto Co., Ltd.
              </h5>
            </div>
            <div className="grid grid-cols-2 gap-[2rem] w-full sm:w-auto sm:flex sm:flex-wrap sm:justify-end sm:ml-auto">
              {menu.map((item) => (
                <div className="sm:ml-14" key={item?.id}>
                  {item?.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className={styles["menu-heading"]}
                    >
                      {item?.name}
                    </a>
                  ) : (
                    <Link
                      href={getLinkPath(item, currentChannel.slug, currentLocale)}
                      passHref
                      legacyBehavior
                    >
                      <a href="pass" className={styles["menu-heading"]}>
                        {item?.name}
                      </a>
                    </Link>
                  )}
                  <ul className={styles.menu}>
                    {item?.children?.map((sub) => (
                      <li key={sub?.id}>
                        {sub?.url ? (
                          <a
                            href={fixMenuItemLocalhostUrl(sub.url)}
                            target="_blank"
                            rel="noreferrer"
                            className={styles["menu-link"]}
                            data-testid={`footerExternalLinks${sub?.name}`}
                          >
                            {sub?.name}
                          </a>
                        ) : (
                          <Link
                            href={getLinkPath(sub, currentChannel.slug, currentLocale)}
                            passHref
                            legacyBehavior
                          >
                            <a
                              href="pass"
                              className={styles["menu-link"]}
                              data-testid={`footerInternalLinks${sub?.name}`}
                            >
                              {sub?.name}
                            </a>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Box>
      </footer>
    </>
  );
}

export default Footer;
