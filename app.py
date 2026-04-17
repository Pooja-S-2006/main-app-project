import sys
import os

# Add submodule path
sys.path.append(os.path.join(os.path.dirname(__file__), 'libs/math-lib-project'))

from calc import add, sub, mul, div

print("Addition:", add(10, 5))
print("Subtraction:", sub(10, 5))
print("Multiplication:", mul(10, 5))
print("Division:", div(10, 5))
