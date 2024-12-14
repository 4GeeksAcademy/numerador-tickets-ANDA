"""empty message

Revision ID: 564c09f18f6e
Revises: 47ef3e94daa2
Create Date: 2024-12-13 23:32:16.182852

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '564c09f18f6e'
down_revision = '47ef3e94daa2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.drop_constraint('appointment_branch_key', type_='unique')
        batch_op.drop_constraint('appointment_datetime_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointment', schema=None) as batch_op:
        batch_op.create_unique_constraint('appointment_datetime_key', ['datetime'])
        batch_op.create_unique_constraint('appointment_branch_key', ['branch'])

    # ### end Alembic commands ###
