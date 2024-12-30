/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, MotionValue, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string, openBlank: boolean }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({ items, className }: { items: { title: string; icon: React.ReactNode; href: string, openBlank: boolean }[]; className?: string }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div layoutId="nav" className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2">
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link href={item.href} key={item.title} rel="noopener noreferrer" target={item.openBlank ? "_blank" : "_self"} className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
            <motion.div
              key={"Theme"}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
                transition: {
                  delay: items.length * 0.05,
                },
              }}
              transition={{ delay: 0 }}
            >
              <Link onClick={() => theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark")} href="#" key={"Theme"} className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-900 flex items-center justify-center">
                <SunMoon className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen(!open)} className="h-10 w-10 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
        <IconLayoutNavbarCollapse className="h-5 w-5" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({ items, className }: { items: { title: string; icon: React.ReactNode; href: string, openBlank: boolean }[]; className?: string }) => {
  const mouseX = useMotionValue(Infinity);
  const theme = useTheme();
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn("mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-50 dark:bg-neutral-900 px-4 pb-3", className)}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
      <IconContainer mouseX={mouseX} title={"Theme"} icon={(
        <SunMoon className="h-5 w-5" />
      )} href={""} onClick={() => theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark")} />
    </motion.div>
  );
};

function IconContainer({ mouseX, title, icon, href, onClick, openBlank }: { mouseX: MotionValue; title: string; icon: React.ReactNode; href: string; onClick?: () => void; openBlank?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Updated to use 60px when distance is 0
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  // Updated to use 30px for the icon when distance is 0
  const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);
  const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 30, 20]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} rel="noopener noreferrer" target={openBlank ? "_blank" : "_self"} onClick={onClick}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
